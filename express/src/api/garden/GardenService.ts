import { StatusCodes } from "http-status-codes"
import { z } from "zod"

import { GardenRepository } from "./GardenRepository"
import { GardenCreateSchema } from "./GardenModel"
import { ServiceResponse } from "@/common/models/serviceResponse"
import { logger } from "@/server"

export class GardenService {
  private gardenRepository = new GardenRepository()

  async create(data: unknown): Promise<ServiceResponse<any>> {
    try {
      const gardenData = GardenCreateSchema.parse(data)

      const createdGarden = await this.gardenRepository.createAsync(gardenData)

      return ServiceResponse.success("Garden created", createdGarden)
    } catch (ex: any) {
      const { message, cause } = ex
      logger.error("Error creating garden:", ex)

      return ServiceResponse.failure(message, cause, cause.error.status)
    }
  }
}

export const gardenService = new GardenService()
