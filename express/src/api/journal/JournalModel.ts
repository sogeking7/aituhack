import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi"
import { z } from "zod"

extendZodWithOpenApi(z)

export const JournalCreateSchema = z.object({
  date: z.string(), // date in ISO format
  notes: z.string().optional(),
  name: z.string(),
  humidity: z
    .object({
      value: z.number().optional(),
      unit: z.string().optional(),
    })
    .optional(),
  height: z
    .object({
      value: z.number().optional(),
      unit: z.string().optional(),
    })
    .optional(),
  garden: z.string().optional(), // Garden ID to associate with
})

export const JournalSchema = z.object({
  id: z.number(),
  date: z.string(),
  notes: z.string().nullable().optional(),
  name: z.string(),
  humidity: z
    .object({
      value: z.number().optional().nullable(),
      unit: z.string().optional().nullable(),
    })
    .nullable()
    .optional(),
  height: z
    .object({
      value: z.number().optional().nullable(),
      unit: z.string().optional().nullable(),
    })
    .nullable()
    .optional(),
  image: z.any().nullable().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
  publishedAt: z.string().nullable().optional(),
})

export type Journal = z.infer<typeof JournalSchema>
export type JournalCreationData = z.infer<typeof JournalCreateSchema>
