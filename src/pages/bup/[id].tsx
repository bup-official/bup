import {
    GetServerSideProps, GetStaticPaths, GetStaticPropsContext, InferGetServerSidePropsType, InferGetStaticPropsType,
} from 'next'
import React from 'react'
import { trpc } from '../../utils/trpc'
import { prisma } from '../../server/db/client';
import { createSSGHelpers } from '@trpc/react/ssg';
import { appRouter } from '../../server/router';

import superjson from 'superjson';
import { createContext } from '../../server/router/context';
import { GetHeaderType } from '../../server/router/header.router';
import { useForm } from 'react-hook-form';
// import VCard from '../../components/VCard';
import { GetVCardType } from '../../server/router/vcard.router';
import VCard from '../../components/VCard';


export default function Card(
    props: InferGetStaticPropsType<typeof getStaticProps>,
    // props: InferGetServerSidePropsType<typeof getServerSideProps>,
) {

    const { id } = props;
    const { data: card, status } = trpc.useQuery(["bupCards.get-cards-by-slug", { id }]);

    if (status !== 'success') {
        return <p>Loading...</p>
    }

    return (
        <>
            <main className='max-w-section mx-auto py-10 grid grid-cols-1 justify-items-center border border-slate-100'>
                <h1 className='text-3xl text-center'>{card.cardTitle}</h1>
                {card.headers.map((header) => (
                    <h1 className='text-center mt-10 text-2xl'>{header.text}</h1>
                ))}
                {
                    card.vCard.map((v) => (
                        <VCard v={v as GetVCardType} />
                    ))
                }
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

// export const getServerSideProps: GetServerSideProps = async ({ query }) => {
//     const { id } = query;

//     if (!id || typeof id !== "string") {
//         return {
//             notFound: true,
//         };
//     }

//     return {
//         props: { id },
//     };
// };

