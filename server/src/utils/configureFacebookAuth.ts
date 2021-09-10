import passport from "passport";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { getConnection } from "typeorm";
import { User } from "../entity/User";

const { PORT = 4000 } = process.env;

let callbackUrl = "/api/v1/auth/facebook/callback";
if (process.env.NODE_ENV === "development")
	callbackUrl = `http://localhost:${PORT}${callbackUrl}`;

console.log(callbackUrl);

const configureFacebookAuth = () => {
	passport.use(
		new FacebookStrategy(
			{
				clientID: process.env.FACEBOOK_APP_ID,
				clientSecret: process.env.FACEBOOK_APP_SECRET,
				callbackURL: callbackUrl,
				profileFields: ["id", "emails", "name"],
			},
			async (accessToken, refreshToken, profile, cb) => {
				const { emails } = profile;
				const { value } = emails[0];

				let user = await getConnection()
					.getRepository(User)
					.createQueryBuilder("user")
					.where("user.email = :email", { email: value })
					.getOne();

				if (user === undefined) {
					user = await User.create({ email: value }).save();
				}

				cb(null, { userId: user.id });
			}
		)
	);
};

export default configureFacebookAuth;
