import express, { type Router } from "express"
import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi"
import { z } from "zod"

import { createApiResponse } from "@/api-docs/openAPIResponseBuilders"
import { validateRequest } from "@/common/utils/httpHandlers"
import { JournalSchema, JournalCreateSchema } from "./JournalModel"
import { journalController } from "./JournalController"

export const journalRegistry = new OpenAPIRegistry()
export const journalRouter: Router = express.Router()

journalRegistry.register("Journal", JournalSchema)

journalRegistry.registerPath({
  method: "post",
  path: "/journals",
  tags: ["Journal"],
  summary: "Create Journal Entry",
  request: {
    body: {
      content: {
        "application/json": {
          schema: JournalCreateSchema,
        },
      },
    },
  },
  responses: createApiResponse(JournalSchema, "Success"),
})

journalRegistry.registerPath({
  method: "post",
  path: "/journals/{journalId}/image",
  tags: ["Journal"],
  summary: "Upload and link image to journal entry",
  request: {
    params: z.object({
      journalId: z.string().describe("Journal entry ID"),
    }),
    body: {
      content: {
        "multipart/form-data": {
          schema: z.object({
            image: z
              .custom<File>()
              .openapi({
                type: "string",
                format: "binary",
              })
              .describe("Image file to upload (JPEG, PNG, WebP formats)"),
          }),
        },
      },
    },
  },
  responses: createApiResponse(
    z.object({
      id: z.number().describe("The ID of the uploaded image"),
      url: z
        .string()
        .describe("The URL where the uploaded image can be accessed"),
      name: z.string().optional().describe("Original filename"),
      mime: z.string().optional().describe("MIME type of the uploaded file"),
      size: z.number().optional().describe("File size in bytes"),
      width: z.number().optional().describe("Image width in pixels"),
      height: z.number().optional().describe("Image height in pixels"),
    }),
    "Success"
  ),
})

journalRouter.post("/", journalController.createJournal)

journalRouter.post(
  "/:journalId/image",
  journalController.uploadAndLinkImageMiddleware,
  journalController.uploadAndLinkImageHandler
)
