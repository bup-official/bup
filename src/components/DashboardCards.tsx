import Image from "next/image"
import Link from "next/link"
import { useForm } from "react-hook-form";
import { string } from "zod";
import { GetCardType } from "../server/router/card.router"
import { trpc } from "../utils/trpc";

// Dashboard Card Component
export const DashboardCards: React.FC<
    {
        inputs?: {
            cardTitle: string | null,
            cardSlug: string,
            createdAt: Date,
            id: string,
        }
    }
> = ({ inputs
}) => {
        const client = trpc.useContext()

        const formattedSlug = inputs?.cardSlug?.replace(/ +/g, "").toLowerCase();

        const { reset, register, handleSubmit, setValue, formState: { errors } } = useForm({
            defaultValues: {
                cardSlug: inputs?.cardSlug ?? "",
                cardTitle: inputs?.cardTitle ?? "",
            }
        });


        const { mutate: deleteMutation } = trpc.useMutation("bupCards.delete-card", {
            onSuccess: () => {
                client.invalidateQueries(["bupCards.get-all-cards"]); // by not using invalidateQueries, we will only see the change happen once we refresh. Otherwise, the change happens instantly.
            }
        })


        const { mutate: updateMutation, isLoading: editLoading } = trpc.useMutation("bupCards.update-card", {
            onSuccess: () => {
                client.invalidateQueries(["bupCards.get-all-cards"]).then(() => {
                });
            }
        })

        const handleDelete = (id: string) => {
            return deleteMutation({
                id
            })
        }

        const handleUpdate = ({ cardSlug, cardTitle }: {
            cardSlug: string,
            cardTitle: string
        }) => {
            if (inputs) {
                return updateMutation({
                    id: inputs.id,
                    cardSlug,
                    cardTitle
                })
            }
        }
        return (

            <article className='h-80 w-80 rounded-2xl flex flex-col justify-around items-center border border-slate-200'>
                <Link href={`/bup/${inputs?.id}`}>
                    <h2 className='cursor-pointer font-quicksand text-gradient text-xl'>{inputs?.cardTitle}</h2>
                </Link>

                <div className='mt-5 flex flex-col items-center gap-y-3'>
                    <button className="w-36 py-2 px-2 border-none bg-transparent rounded-2xl border border-slate-200 ">View Card Info</button>

                    <Link href={`/bup/playground/${inputs?.id}`}>
                        <button className='w-36 py-2 px-2 border-none bg-transparent rounded-2xl border border-slate-200 button-gradient'>Edit {inputs?.cardTitle}</button>

                    </Link>
                </div>

                <div className='w-full flex items-center justify-around'>

                    {/* Logo */}
                    <div className="flex items-center">
                        <Image
                            src={'/images/logo/logo.png'}
                            width={75}
                            height={75}
                        />
                    </div>
                    <small>Created on: {inputs?.createdAt.toLocaleDateString()}</small>
                </div>
                <button onClick={() => handleDelete(inputs?.id!)}>Delete</button>

                <br />
                <br />
                <br />

                <form className="flex flex-col gap-y-4">
                    <fieldset className="flex flex-col">
                        <label htmlFor="cardSlug" className="">Card Slug</label>
                        <input {...register("cardSlug")} placeholder="Card Slug" className="text-black px-2 py-1 rounded-md" />
                    </fieldset>

                    <fieldset className="flex flex-col">
                        <label htmlFor="cardTitle" className="">Card Title</label>
                        <input {...register("cardTitle")} placeholder="Card Title" className="text-black px-2 py-1 rounded-md" />
                    </fieldset>

                    <button
                        onClick={handleSubmit(handleUpdate)}
                        className="p-2 border rounded-lg border-slate-200" type="submit">Update Card</button>
                    {editLoading && <p>Updating Card...</p>}
                </form>
            </article>
        )
    }