import express from "express";
import passport from "passport";

const router = express.Router();

const { FRONTEND_CLIENT = "http://localhost:3000" } = process.env;

router.get(
	"/",
	passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
	"/callback",
	passport.authenticate("google", {
		failureRedirect: `${FRONTEND_CLIENT}/login`,
		session: false,
	}),
	(req, res) => {
		// Successful authentication, redirect home.
		req.session.userId = (req.user as any).userId;
		res.redirect(`${FRONTEND_CLIENT}/dashboard`);
	}
);

export default router;
