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

export default function Playground(
    props: InferGetStaticPropsType<typeof getStaticProps>,
) {
    const { id } = props;
    const { data: card, status } = trpc.useQuery(["bupCards.get-cards-by-slug", { id }])

    // Router
    const router = useRouter();
    const refreshData = () => {
        router.reload()
    }

    // tRPC Context
    const client = trpc.useContext()


    // tRPC Header Create Mutations Hook
    const { mutate: createHeaderMutation } = trpc.useMutation("header.create-header", {
        onSuccess: () => {
            client.invalidateQueries("bupCards.get-cards-by-slug"),
                refreshData()
        }
        // onSuccess: () => refreshData()
    })

    // Create Header Mutation
    const createHeader = ({ text }: { text: string }) => {
        return createHeaderMutation({
            text,
            cardId: id!
        })

    }

    // tRPC Header Delete Mutation Hook
    const { mutate: deleteMutation } = trpc.useMutation("header.delete-header", {
        onSuccess: () => {
            client.invalidateQueries("bupCards.get-cards-by-slug")
        }
    });

    // Delete Header Mutation
    const deleteHeader = (id: string) => {
        return deleteMutation({
            id
        })
    }


    // tRPC Vcard Create Mutations Hook
    const { mutate: createVCardMutation } = trpc.useMutation("vcard.create-vcard", {
        onSuccess: () => {
            client.invalidateQueries("bupCards.get-cards-by-slug"),
                refreshData()
        }
    })

    const createVCard = ({
        vCardTitle,
        firstName,
        lastName,
        phoneNumber,
        emailAddress,
        url,
        note,
    }: {
        cardId: string,
        vCardTitle: string,
        firstName: string,
        lastName: string,
        phoneNumber: string,
        emailAddress: string,
        url: string,
        note: string,
    }) => {
        return createVCardMutation({
            cardId: id!,
            vCardTitle,
            firstName,
            lastName,
            phoneNumber,
            emailAddress,
            url,
            note,
        })
    }

    // tRPC VCard Delete Mutation Hook
    const { mutate: deleteVCardMutation } = trpc.useMutation("vcard.delete-vcard", {
        onSuccess: () => {
            client.invalidateQueries("bupCards.get-cards-by-slug"),
                refreshData()
        }
    })

    const deleteVCard = (id: string) => {
        return deleteVCardMutation({
            id
        })
    }




    // react-hook-form
    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        defaultValues: {
            text: "",
            cardId: "",
            vCardTitle: "",
            firstName: "",
            lastName: "",
            phoneNumber: "",
            emailAddress: "",
            url: "",
            note: "",

        }
    });







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
                        {/* Create Header Form */}
                        <form className="flex flex-col gap-y-4 mt-5">
                            <fieldset className="flex flex-col gap-y-2">
                                <label htmlFor="headerText" className="">Create Header</label>
                                <input {...register("text")} id="headerText" placeholder="Header Text" className="  py-1 bg-transparent border-b-2" />
                            </fieldset>

                            <button
                                onClick={handleSubmit(createHeader)}
                                className="p-2 border rounded-lg border-slate-200" type="submit">Create Header</button>
                        </form>

                        {/* Map Over the Headers */}
                        {card.headers.map((header) => (
                            <div key={header.id}>
                                <p className='mt-5'>{header.text}</p>
                                <button className="p-2 border rounded-lg border-slate-200" type="submit" onClick={() => deleteHeader(header.id)}>Delete</button>

                            </div>
                        ))}
                    </div>

                    <hr className='mt-10' />

                    {/* vCARD */}
                    <div className='mt-10 '>
                        <h1 className='font-bold text-3xl'>Card VCard</h1>
                        {/* Create VCard Form */}
                        <form className="flex flex-col gap-y-4">

                            {/* Create vCard Title */}
                            <fieldset className="flex flex-col gap-y-2 border border-slate-400">
                                <label htmlFor="vCardTitle" className="">vCard Title</label>
                                <input {...register("vCardTitle")} id="vCardTitle" placeholder="vCard Title" className="  py-1 bg-transparent border-2" />
                            </fieldset>

                            {/* Create vCard First Name */}
                            <fieldset className="flex flex-col gap-y-2 border border-slate-400">
                                <label htmlFor="vCardFirstName" className="">First Name</label>
                                <input {...register("firstName")} id="vCardFirstName" placeholder="First Name" className="  py-1 bg-transparent border-2" />
                            </fieldset>

                            {/* Create vCard Last Name */}
                            <fieldset className="flex flex-col gap-y-2 border border-slate-400">
                                <label htmlFor="vCardLastName" className="">Last Name</label>
                                <input {...register("lastName")} id="vCardLastName" placeholder="Last Name" className="  py-1 bg-transparent border-2" />
                            </fieldset>

                            {/* Create vCard Phone Number */}
                            <fieldset className="flex flex-col gap-y-2 border border-slate-400">
                                <label htmlFor="vCardPhoneNumber" className="">Phone Number</label>
                                <input {...register("phoneNumber")} id="vCardPhoneNumber" placeholder="(555)-555-5555" className="  py-1 bg-transparent border-2" />
                            </fieldset>

                            {/* Create vCard Email Address */}
                            <fieldset className="flex flex-col gap-y-2 border border-slate-400">
                                <label htmlFor="vCardEmailAddress" className="">Email Address</label>
                                <input {...register("emailAddress")} id="vCardEmailAddress" placeholder="johndoe@gmail.com" className="  py-1 bg-transparent border-2" />
                            </fieldset>

                            {/* Create vCard URL */}
                            <fieldset className="flex flex-col gap-y-2 border border-slate-400">
                                <label htmlFor="vCardURL" className="">URL</label>
                                <input {...register("url")} id="vCardURL" placeholder="https://www.google.com" className="  py-1 bg-transparent border-2" />
                            </fieldset>

                            {/* Create vCard Note */}
                            <fieldset className="flex flex-col gap-y-2 border border-slate-400">
                                <label htmlFor="vCardNote" className="">Note</label>
                                <input {...register("note")} id="vCardNote" placeholder="Leave a note here" className="  py-1 bg-transparent border-2" />
                            </fieldset>

                            <button
                                onClick={handleSubmit(createVCard)}
                                className="p-2 border rounded-lg border-slate-200" type="submit">Create vCard</button>
                        </form>

                        {/* Map Over the Headers */}
                        {card.vCard.map((v) => (
                            <div key={v.id}>
                                <p className='mt-5'>{v.vCardTitle}</p>
                                <button className="p-2 border rounded-lg border-slate-200" type="submit" onClick={() => deleteVCard(v.id)}>Delete</button>

                            </div>
                        ))}
                    </div>

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