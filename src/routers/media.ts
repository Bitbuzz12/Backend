import { Router } from "express";
import * as Media from "../controllers/media"
import authorize from "../middlewares/authorize";
import validateIdParam from "../middlewares/validateIdParam";

const router = Router()


router.post("/", authorize,Media.createMedia)
router.get("/", Media.getMedias)
router.get("/uploads/", authorize, Media.getMyMedias)
router.get("/:mediaId", validateIdParam, Media.getMedias)
router.delete("/:mediaId", authorize, validateIdParam, Media.deleteMedia)

export default router;