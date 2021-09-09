import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import { getConnection } from "typeorm";
import { User } from "../entity/User";

const configureGithubAuth = () => {
	passport.use(
		new GitHubStrategy(
			{
				clientID: process.env.GITHUB_CLIENT_ID,
				clientSecret: process.env.GITHUB_CLIENT_SECRET,
				callbackURL: "http://localhost:4000/api/v1/auth/github/callback",
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
