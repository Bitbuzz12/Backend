import { Router } from "express";
import * as Media from "../controllers/media"

const router = Router()


router.post("/medias", Media.createMedia)
router.get("/medias", Media.getMedias)
router.get("/medias/:mediaId", Media.getMedias)

export default router;