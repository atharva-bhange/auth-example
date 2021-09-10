import express from "express";
import {
	isLoggedIn,
	login,
	register,
	logout,
} from "../controllers/authController";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/login", isLoggedIn);
router.post("/logout", logout);

export default router;
