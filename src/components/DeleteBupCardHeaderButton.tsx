import { useRouter } from 'next/router';
import React from 'react'
import { GetHeaderType } from '../server/router/header.router';
import { trpc } from '../utils/trpc';

const DeleteBupCardHeaderButton = ({
    header
}: {
    header: GetHeaderType
}) => {
    const router = useRouter();

    const client = trpc.useContext()

    // tRPC Header Delete Mutation Hook
    const { mutate: deleteMutation } = trpc.useMutation("header.delete-header", {
        onSuccess: () => {
            client.invalidateQueries("bupCards.get-cards-by-slug"),
                router.reload()
        }
    });

    // Delete Header Mutation
    const deleteHeader = (id: string) => {
        return deleteMutation({
            id
        })
    }
    return (
        <>
            <p className='mt-5'>{header.text}</p>
            <button className="p-2 border rounded-lg border-slate-200" type="submit" onClick={() => deleteHeader(header.id)}>Delete</button>
        </>
    )
}

export default DeleteBupCardHeaderButton