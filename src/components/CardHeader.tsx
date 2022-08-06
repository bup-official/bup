// import React from 'react'
// import { trpc } from '../utils/trpc';
// import { useRouter } from 'next/router'
// import { GetHeaderType } from '../server/router/header.router';
// import { useForm } from 'react-hook-form';

// const CardHeader: React.FC<{
//     id: string | undefined;
//     headers: GetHeaderType[]
// }> = ({ id, headers }) => {
//     const router = useRouter();
//     const refreshData = () => {
//         router.reload()
//     }
//     const client = trpc.useContext();

//     const { mutate: createHeaderMutation } = trpc.useMutation("header.create-header", {
//         onMutate: () => refreshData()
//     })

//     const { mutate: deleteMutation } = trpc.useMutation("header.delete-header", {
//         onSuccess: () => {
//             client.invalidateQueries("bupCards.get-cards-by-slug")
//         }
//     });
//     const deleteHeader = (id: string) => {
//         return deleteMutation({
//             id
//         })
//     }

//     const { register, handleSubmit, setValue, formState: { errors } } = useForm({
//         defaultValues: {
//             text: "",
//             cardId: ''

//         }
//     });

//     const createText = ({ text, cardId }: { cardId: string, text: string }) => {
//         return createHeaderMutation({
//             text,
//             cardId: cardId
//         })

//     }
//     return (
//         <div>
//             {headers.map((header) => (
//                 <div>
//                     <p>{header.text}</p>
//                     <button className="p-2 border rounded-lg border-slate-200" type="submit" onClick={() => deleteHeader(header.id)}>Delete</button>

//                 </div>
//             ))}
//         </div>
//     )
// }

// export default CardHeader

import React from 'react'

const CardHeader = () => {
    return (
        <div>CardHeader</div>
    )
}

export default CardHeader