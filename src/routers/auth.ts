import { Router } from "express";
import * as auth from "../controllers/auth"

const router = Router()

router.post("/register", auth.register)

export default router;