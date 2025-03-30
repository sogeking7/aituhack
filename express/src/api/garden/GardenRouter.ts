import express, { type Router } from "express"
import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi"
import { z } from "zod"

import { createApiResponse } from "@/api-docs/openAPIResponseBuilders"
import { validateRequest } from "@/common/utils/httpHandlers"
import { GardenSchema, GardenCreateSchema } from "./GardenModel"
import { gardenController } from "./GardenController"

export const gardenRegistry = new OpenAPIRegistry()
export const gardenRouter: Router = express.Router()

gardenRegistry.register("Garden", GardenSchema)

gardenRegistry.registerPath({
  method: "post",
  path: "/gardens",
  tags: ["Garden"],
  summary: "Create Garden",
  request: {
    body: {
      content: {
        "application/json": {
          schema: GardenCreateSchema,
        },
      },
    },
  },
  responses: createApiResponse(GardenSchema, "Success"),
})

gardenRouter.post("/", gardenController.createGarden)
