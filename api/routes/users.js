import express from "express"
import { updatePassword } from "../controllers/user.js";

const router = express.Router();

router.put("/resetpassword",updatePassword);

export default router;
