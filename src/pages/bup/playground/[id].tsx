import { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { prisma } from '../../../server/db/client'
import React from 'react'
import { createSSGHelpers } from '@trpc/react/ssg'
import { appRouter } from '../../../server/router'
import { createContext } from '../../../server/router/context'
import superjson from 'superjson'
import { trpc } from '../../../utils/trpc'
import { Navigation } from '../../../components/Navigation'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import CardPreviewIframe from '../../../components/CardPreviewIframe'
import { GetVCardType } from '../../../server/router/vcard.router'
import { GetHeaderType } from '../../../server/router/header.router'
import {
    CreateBupCardHeaderForm,
    CreateBupCardVCardForm,
    DeleteBupCardHeaderButton,
    DeleteBupCardVCardButton
} from '../../../components'

export default function Playground(
    props: InferGetStaticPropsType<typeof getStaticProps>,
) {
    const { id }: { id: string } = props;
    const { data: card, status } = trpc.useQuery(["bupCards.get-cards-by-slug", { id }])

    if (status !== 'success') {
        return <p>Loading...</p>
    }

    return (
        <>
            <Navigation />
            <main className='max-w-section mx-auto py-10 grid grid-cols-2 gap-x-10'>
                <div id="customizations" className="bg-black px-2">
                    <h1 className='text-center'>Playground</h1>

                    {/*CARD HEADER */}
                    <div>
                        <h1 className='font-bold text-3xl'>Card Headers</h1>

                        <CreateBupCardHeaderForm id={id as string} />

                        {card.headers.map((header) => (
                            <DeleteBupCardHeaderButton key={header.id} header={header as GetHeaderType} />
                        ))}
                    </div>

                    <hr className='mt-10' />

                    {/* Create VCard Form */}
                    <CreateBupCardVCardForm
                        id={id as string}
                    />

                    {/* Map Over the vCards */}
                    {card.vCard.map((v) => (
                        <DeleteBupCardVCardButton key={v.id} v={v as GetVCardType} />
                    ))}

                </div>
                <CardPreviewIframe id={id} />
            </main>
        </>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {

    const id = await prisma.bupCard.findMany({
        select: {
            id: true
        }
    })

    return {
        paths: id.map((s) => ({
            params: {
                id: s.id
            }
        })),
        fallback: 'blocking',
    }
}

export async function getStaticProps(
    context: GetStaticPropsContext<{ id: string }>, // slug is represented by the file name [slug].tsx
) {

    const ssg = createSSGHelpers({
        router: appRouter,
        ctx: createContext(),
        transformer: superjson,
    });
    const id = context.params?.id as any

    await ssg.fetchQuery("bupCards.get-cards-by-slug", {
        id
    })
    return {
        props: {
            trpcState: ssg.dehydrate(),
            id,
        },
        revalidate: 1,
    };
}