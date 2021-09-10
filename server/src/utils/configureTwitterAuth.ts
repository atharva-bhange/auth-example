import passport from "passport";
import { Strategy as TwitterStrategy } from "passport-twitter";
import { getConnection } from "typeorm";
import { User } from "../entity/User";

const { PORT = 4000 } = process.env;
let callbackUrl = "/api/v1/auth/twitter/callback";
if (process.env.NODE_ENV === "development")
	callbackUrl = `http://localhost:${PORT}${callbackUrl}`;

const configureTwitterAuth = () => {
	passport.use(
		new TwitterStrategy(
			{
				consumerKey: process.env.TWITTER_CONSUMER_KEY,
				consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
				callbackURL: callbackUrl,
				includeEmail: true,
			},
			async (token, tokenSecret, profile, cb) => {
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

export default configureTwitterAuth;
