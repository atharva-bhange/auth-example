import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import { getConnection } from "typeorm";
import { User } from "../entity/User";

const { PORT = 4000 } = process.env;
let callbackUrl = "/api/v1/auth/github/callback";
if (process.env.NODE_ENV === "development")
	callbackUrl = `http://localhost:${PORT}${callbackUrl}`;

console.log("github", callbackUrl);

const configureGithubAuth = () => {
	passport.use(
		new GitHubStrategy(
			{
				clientID: process.env.GITHUB_CLIENT_ID,
				clientSecret: process.env.GITHUB_CLIENT_SECRET,
				callbackURL: callbackUrl,
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

export default configureGithubAuth;
