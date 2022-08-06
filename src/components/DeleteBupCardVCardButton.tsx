import { useRouter } from 'next/router';
import { GetVCardType } from '../server/router/vcard.router';
import { trpc } from '../utils/trpc'

const DeleteVCardButton = ({
    v
}: {
    v: GetVCardType
}) => {

    const router = useRouter();

    const client = trpc.useContext()

    // tRPC + react-query useMutation hook
    const { mutate: deleteVCardMutation } = trpc.useMutation("vcard.delete-vcard", {
        onSuccess: () => {
            client.invalidateQueries("bupCards.get-cards-by-slug"),
                router.reload()
        }
    })

    // Delete vCard Function
    const deleteVCard = (id: string) => {
        return deleteVCardMutation({
            id
        })
    }

    return (
        <>
            <p className='mt-5'>{v.vCardTitle}</p>
            <button className="p-2 border rounded-lg border-slate-200" type="submit" onClick={() => deleteVCard(v.id)}>Delete</button>
        </>
    )
}

export default DeleteVCardButton