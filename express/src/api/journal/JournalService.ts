import { StatusCodes } from "http-status-codes"

import { JournalRepository } from "./JournalRepository"
import { JournalCreateSchema } from "./JournalModel"
import { ServiceResponse } from "@/common/models/serviceResponse"
import { logger } from "@/server"

export class JournalService {
  private journalRepository = new JournalRepository()

  async create(data: unknown): Promise<ServiceResponse<any>> {
    try {

      const journalData = JournalCreateSchema.parse(data)
      
      const createdJournal = await this.journalRepository.createAsync(
        journalData
      )

      return ServiceResponse.success("Journal entry created", createdJournal)
    } catch (ex: any) {
      const { message, cause } = ex
      logger.error("Error creating journal entry:", ex)

      return ServiceResponse.failure(
        message,
        cause,
        cause?.error?.status || StatusCodes.INTERNAL_SERVER_ERROR
      )
    }
  }

}

export const journalService = new JournalService()
