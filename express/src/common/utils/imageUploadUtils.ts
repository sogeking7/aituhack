// src/common/utils/imageUploadUtils.ts
import axios from "axios"
import FormData from "form-data"
import fs from "fs"
import { ServiceResponse } from "@/common/models/serviceResponse"
import { logger } from "@/server"

const STRAPI_BASE_URL = "http://89.35.124.212:1337/api"

/**
 * Uploads an image to Strapi Media Library
 */
export async function uploadImage(
  filePath: string,
  fileName: string
): Promise<ServiceResponse<any>> {
  try {
    const formData = new FormData()
    const fileStream = fs.createReadStream(filePath)

    formData.append("files", fileStream, fileName)

    const response = await axios.post(`${STRAPI_BASE_URL}/upload`, formData, {
      headers: {
        ...formData.getHeaders(),
      },
    })

    return ServiceResponse.success(
      "Image uploaded successfully",
      response.data[0]
    )
  } catch (error: any) {
    logger.error("Error uploading image:", error)
    return ServiceResponse.failure(
      "Image upload failed",
      error.response?.data || error.message,
      error.response?.status || 500
    )
  }
}

/**
 * Uploads an image and links it to a specific entity
 */
export async function uploadAndLinkImage(
  filePath: string,
  fileName: string,
  ref: string,
  refId: number,
  field: string
): Promise<ServiceResponse<any>> {
  try {
    const formData = new FormData()
    const fileStream = fs.createReadStream(filePath)

    formData.append("files", fileStream, fileName)
    formData.append("ref", ref) // Collection name (e.g., 'api::journal.journal')
    formData.append("refId", refId.toString()) // Entity ID
    formData.append("field", field) // Field name (e.g., 'image')

    const response = await axios.post(`${STRAPI_BASE_URL}/upload`, formData, {
      headers: {
        ...formData.getHeaders(),
      },
    })

    return ServiceResponse.success(
      "Image uploaded and linked successfully",
      response.data[0]
    )
  } catch (error: any) {
    logger.error("Error uploading and linking image:", error)
    return ServiceResponse.failure(
      "Image upload and linking failed",
      error.response?.data || error.message,
      error.response?.status || 500
    )
  }
}
