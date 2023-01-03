import express from "express"
import { logIn, logOut, register } from "../controllers/auth.js";

const router = express.Router();

router.post("/register",register)
router.post("/register",logIn);
router.post("/register",logOut);

export default router;
