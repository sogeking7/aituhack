import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi"
import { z } from "zod"

extendZodWithOpenApi(z)

export const GardenCreateSchema = z.object({
  name: z.string(),
  seeding_date: z.string().optional(),
  microgreen: z.number().optional(),
  user: z.number().optional(),
})

export const GardenSchema = z.object({
  id: z.number(),
  name: z.string(),
  seeding_date: z.string().nullable().optional(),
  microgreen: z.any().nullable().optional(),
  user: z.any().nullable().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export type Garden = z.infer<typeof GardenSchema>
export type GardenCreationData = z.infer<typeof GardenCreateSchema>
