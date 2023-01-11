import express from "express"
import { changePassword, changePasswordOpen, updatePassword } from "../controllers/user.js";

const router = express.Router();

router.put("/resetpassword",updatePassword);
router.post("/changepassword",changePassword);
router.put("/change-password/:id/:token",changePasswordOpen);

export default router;
