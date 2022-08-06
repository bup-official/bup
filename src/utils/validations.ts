import { z } from "zod"

export const createCardValidation = z.object({
    cardSlug: z.string().min(3).max(15),
    cardTitle: z.string().min(5).max(50),
})

export const createHeaderValidation = z.object({
    text: z.string().min(1).max(50).trim(),
    cardId: z.string()
})

export const createVCardValidation = z.object({
    vCardTitle: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    phoneNumber: z.string(),
    emailAddress: z.string().email(),
    url: z.string().url(),
    note: z.string().trim(),
    cardId: z.string(),
})

