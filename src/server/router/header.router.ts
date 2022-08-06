import { z } from "zod";
import { inferQueryResponses } from "../../utils/trpc";
import { createHeaderValidation } from "../../utils/validations";
import { createRouter } from "./context";


export const headerRouter = createRouter()
    .query("get-headers", {
        input: z.object({
            cardId: z.string(),
        }),
        async resolve({ input, ctx }) {
            const headers = await ctx.prisma.header.findMany({
                where: {
                    cardId: input.cardId
                }
            });
            return headers.map((header) => {
                return {
                    ...header
                }
            })
        }
    })
    .mutation("create-header", {
        input: createHeaderValidation,
        async resolve({ input, ctx }) {
            return await ctx.prisma.header.create({
                data: {
                    cardId: input.cardId,
                    text: input.text
                }
            })
        }
    })
    .mutation("delete-header", {
        input: z.object({
            id: z.string()
        }),
        async resolve({ input, ctx }) {
            return await ctx.prisma.header.delete({
                where: {
                    id: input.id
                }
            })
        }
    })

export type GetHeadersArrType = inferQueryResponses<"header.get-headers">;
export type GetHeaderType = GetHeadersArrType[number];