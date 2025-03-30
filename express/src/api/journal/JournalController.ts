import type { Request, RequestHandler, Response } from "express"
import multer from "multer"
import path from "path"
import fs from "fs"
import { journalService } from "./JournalService"
import { handleServiceResponse } from "@/common/utils/httpHandlers"
import {
  uploadImage,
  uploadAndLinkImage,
} from "@/common/utils/imageUploadUtils"
import { logger } from "@/server"

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "../../temp-uploads")

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
    }

    cb(null, uploadDir)
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
    cb(null, uniqueSuffix + path.extname(file.originalname))
  },
})

const upload = multer({ storage })

class JournalController {
  public createJournal: RequestHandler = async (
    req: Request,
    res: Response
  ) => {
    const serviceResponse = await journalService.create(req.body)
    return handleServiceResponse(serviceResponse, res)
  }

  public uploadAndLinkImageMiddleware = upload.single("image")
  public uploadAndLinkImageHandler: RequestHandler = async (
    req: Request,
    res: Response
  ) => {
    if (!req.file) {
      return res.status(400).json({ error: "No image provided" })
    }

    const { journalId } = req.params

    if (!journalId || isNaN(parseInt(journalId))) {
      return res.status(400).json({ error: "Invalid journal ID" })
    }

    const filePath = req.file.path
    const fileName = req.file.originalname

    try {
      const uploadResult = await uploadAndLinkImage(
        filePath,
        fileName,
        "api::journal.journal",
        parseInt(journalId),
        "image"
      )

      fs.unlink(filePath, (err) => {
        if (err) logger.error(`Error deleting temp file: ${filePath}`, err)
      })

      return handleServiceResponse(uploadResult, res)
    } catch (error: any) {
      fs.unlink(filePath, (err) => {
        if (err) logger.error(`Error deleting temp file: ${filePath}`, err)
      })

      return res.status(500).json({ error: error.message })
    }
  }
}

export const journalController = new JournalController()
