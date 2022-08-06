import { useRouter } from 'next/router';
import React from 'react'
import { useForm } from 'react-hook-form';
import { GetCardType } from '../server/router/card.router';
import { GetVCardType } from '../server/router/vcard.router';
import { trpc } from '../utils/trpc';



const VCardForm = (
    { id }:
        { id: string | null }
) => {
    const router = useRouter()

    const refreshData = () => {
        router.reload()
    }

    const client = trpc.useContext()

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
    return (
        <div className='mt-10'>
            <h1 className='font-bold text-3xl'>VCard</h1>

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

        </div>
    )
}

export default VCardForm