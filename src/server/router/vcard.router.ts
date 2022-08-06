import { z } from "zod";
import { inferQueryResponses } from "../../utils/trpc";
import { createVCardValidation } from "../../utils/validations";
import { createRouter } from "./context";


export const vcardRouter = createRouter()
    .query("get-vcards", {
        input: z.object({
            cardId: z.string(),
        }),
        async resolve({ input, ctx }) {
            const vcards = await ctx.prisma.vCard.findMany({
                where: {
                    cardId: input.cardId
                }
            });
            return vcards.map((vcard) => {
                return {
                    ...vcard
                }
            })
        }
    })
    .mutation("create-vcard", {
        input: createVCardValidation,
        async resolve({ input, ctx }) {
            return await ctx.prisma.vCard.create({
                data: {
                    vCardTitle: input.vCardTitle,
                    cardId: input.cardId,
                    firstName: input.firstName,
                    lastName: input.lastName,
                    phoneNumber: input.phoneNumber,
                    emailAddress: input.emailAddress,
                    url: input.url,
                    note: input.note,
                }
            })
        }
    })
    .mutation("delete-vcard", {
        input: z.object({
            id: z.string()
        }),
        async resolve({ input, ctx }) {
            return await ctx.prisma.vCard.delete({
                where: {
                    id: input.id
                }
            })
        }
    })

export type GetVCardsArrType = inferQueryResponses<"vcard.get-vcards">;
export type GetVCardType = GetVCardsArrType[number];