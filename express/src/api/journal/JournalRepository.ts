import axios from "axios"
import type { JournalCreationData } from "./JournalModel"

const STRAPI_BASE_URL = "http://89.35.124.212:1337/api"

export class JournalRepository {
  async createAsync(data: JournalCreationData): Promise<any> {
    try {
      const { garden, ...restData } = data

      const response1 = await axios.post(
        `${STRAPI_BASE_URL}/journals`,
        {
          data: restData
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      const data1 = response1.data
      const newJournalId = data1.data.documentId

      const response2 = await axios.put(
        `${STRAPI_BASE_URL}/gardens/${garden}`,
        {
          data: {
            journals: {
              connect: [newJournalId],
            },
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      return response2.data
    } catch (error: any) {
      throw new Error(error.response.data.error.message, {
        cause: error.response.data,
      })
    }
  }

  async getByGardenIdAsync(gardenId: number): Promise<any> {
    try {
      const response = await axios.get(
        `${STRAPI_BASE_URL}/journals?filters[garden]=${gardenId}&sort=date:desc`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      return response.data
    } catch (error: any) {
      throw new Error(error.response.data.error.message, {
        cause: error.response.data,
      })
    }
  }
}
