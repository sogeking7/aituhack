import type { Request, RequestHandler, Response } from "express"
import { gardenService } from "./GardenService"
import { handleServiceResponse } from "@/common/utils/httpHandlers"

class GardenController {
  public createGarden: RequestHandler = async (req: Request, res: Response) => {
    const serviceResponse = await gardenService.create(req.body)
    return handleServiceResponse(serviceResponse, res)
  }
}

export const gardenController = new GardenController()
