import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi"
import { z } from "zod"

extendZodWithOpenApi(z)

export const GardenCreateSchema = z.object({
  name: z.string(),
  seeding_date: z.string().optional(),
  microgreen: z.string().optional(),
  user: z.number().optional(),
  commentary: z.string().optional(),
  substrate_type: z.string().optional(),
})

export const GardenSchema = z.object({
  id: z.number(),
  name: z.string(),
  seeding_date: z.string().nullable().optional(),
  microgreen: z.any().nullable().optional(),
  user: z.any().nullable().optional(),
  commentary: z.string().optional(),
  estimated_remaining_days: z.number().nullable().optional(),
  journals: z.array(z.any()).nullable().optional(),
  notification: z
    .object({
      enabled: z.boolean().nullable().optional(),
      time: z.string().nullable().optional(),
      frequency: z.string().nullable().optional(),
    })
    .nullable()
    .optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export type Garden = z.infer<typeof GardenSchema>
export type GardenCreationData = z.infer<typeof GardenCreateSchema>
