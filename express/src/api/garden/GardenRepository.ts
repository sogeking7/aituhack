import axios from "axios"
import type { GardenCreationData } from "./GardenModel"
import { an } from "vitest/dist/chunks/reporters.d.CqBhtcTq"

const STRAPI_BASE_URL = "http://89.35.124.212:1337/api"

export class GardenRepository {
  async createAsync(data: GardenCreationData): Promise<any> {
    try {
      const response = await axios.post(
        `${STRAPI_BASE_URL}/gardens`,
        {
          data: data,
        },
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
