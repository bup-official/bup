import { nullable, z } from 'zod'
import { prisma } from '../db/client'
import { inferQueryResponses } from '../../utils/trpc'
import { createRouter } from './context'
import { createCardValidation, } from '../../utils/validations'

export const cardRouter = createRouter()

    .query('get-all-cards', {
        async resolve({ ctx }) {
            const fetchCards = await ctx.prisma.bupCard.findMany()
            return fetchCards.map((card) => {
                return {
                    ...card
                }
            })
        }
    })
    .query('get-cards-by-slug', {
        input: z.object({
            id: z.string(),
        }),
        async resolve({ ctx, input }) {
            const singleCard = await ctx.prisma.bupCard.findFirst({
                where: {
                    id: input.id
                }
            });
            const headers = await ctx.prisma.header.findMany({
                where: {
                    cardId: input.id
                }
            })

            const mapHeaders = headers.map((header) => {
                return {
                    ...header
                }
            })

            const vCards = await ctx.prisma.vCard.findMany({
                where: {
                    cardId: input.id
                }
            })

            const mapVCards = vCards.map((vCard) => {
                return {
                    ...vCard
                }
            })
            return {
                ...singleCard,
                headers: mapHeaders,
                vCard: mapVCards,
            }
        }
    })
    .mutation("create-slug", {
        input: createCardValidation,
        async resolve({ input, ctx }) {
            return await ctx.prisma.bupCard.create({
                data: {
                    cardSlug: input.cardSlug,
                    cardTitle: input.cardTitle
                }
            })
        }
    })
    .mutation("update-card", {
        input: z.object({
            id: z.string(),
            cardSlug: z.string().min(3).max(15),
            cardTitle: z.string().min(5).max(50),
        }),
        async resolve({ input, ctx }) {
            return await ctx.prisma.bupCard.update({
                where: {
                    id: input.id
                },
                data: {
                    cardTitle: input.cardTitle,
                    cardSlug: input.cardSlug
                }
            });
        }
    })
    .mutation("delete-card", {
        input: z.object({
            id: z.string()
        }),
        async resolve({ input, ctx }) {
            await ctx.prisma.bupCard.delete({
                where: {
                    id: input.id
                }
            })
            await ctx.prisma.header.deleteMany({
                where: {
                    cardId: input.id
                }
            })
            await ctx.prisma.vCard.deleteMany({
                where: {
                    cardId: input.id
                }
            })
        }
    })



export type GetCardsArrType = inferQueryResponses<"bupCards.get-all-cards">;
export type GetCardType = GetCardsArrType[number];