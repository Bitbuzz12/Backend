import { Router } from "express";
import * as Media from "../controllers/media"
import authorize from "../middlewares/authorize";
import validateIdParam from "../middlewares/validateIdParam";

const router = Router()


router.post("/", authorize,Media.createMedia)
router.get("/", Media.getMedias)
router.get("/uploads/", authorize, Media.getMyMedias)
router.get("/:mediaId", validateIdParam, Media.getMedia)
router.delete("/:mediaId", authorize, validateIdParam, Media.deleteMedia)
router.post("/:mediaId/comments", authorize, validateIdParam, Media.commentOnMedia)
router.get("/:mediaId/comments", authorize, validateIdParam, Media.getComments)
router.patch("/:meadiaId/react", authorize, validateIdParam, Media.reactToMedia)
router.patch("/:mediaId/repost", authorize, validateIdParam, Media.repostMedia)

export default router;