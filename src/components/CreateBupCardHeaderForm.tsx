import { useRouter } from 'next/router';
import React from 'react'
import { useForm } from 'react-hook-form';
import { trpc } from '../utils/trpc';

const CreateBupCardHeaderForm = ({
    id
}: {
    id: string
}) => {

    // Router
    const router = useRouter();

    // tRPC Context
    const client = trpc.useContext()


    // tRPC Header Create Mutations Hook
    const { mutate: createHeaderMutation } = trpc.useMutation("header.create-header", {
        onSuccess: () => {
            client.invalidateQueries("bupCards.get-cards-by-slug"),
                router.reload()
        }
    })

    // Create Header Mutation
    const createHeader = ({ text }: { text: string }) => {
        return createHeaderMutation({
            text,
            cardId: id!
        })
    }


    // react-hook-form
    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        defaultValues: {
            text: "",
            cardId: "",
        }
    });

    return (
        <>
            <form className="flex flex-col gap-y-4 mt-5">
                <fieldset className="flex flex-col gap-y-2">
                    <label htmlFor="headerText" className="">Create Header</label>
                    <input {...register("text")} id="headerText" placeholder="Header Text" className="  py-1 bg-transparent border-b-2" />
                </fieldset>

                <button
                    onClick={handleSubmit(createHeader)}
                    className="p-2 border rounded-lg border-slate-200" type="submit">Create Header</button>
            </form>
        </>
    )
}

export default CreateBupCardHeaderForm