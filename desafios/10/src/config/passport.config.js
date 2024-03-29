import passport from "passport"
import { Strategy as LocalStrategy } from "passport-local"
import { Strategy as GithubStrategy } from "passport-github2"
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt"
import { createHash, isValidPassword, JWT_SECRET } from "../utils.js"
import UserModel from "../dao/models/user.model.js"
import config from "./config.js"

export const init = () => {
    const registerOpts = {
        usernameField: "email",
        passReqToCallback: true,
    }
    passport.use(
        "register",
        new LocalStrategy(registerOpts, async (req, email, password, done) => {
            const {
                body: { first_name, last_name, age },
            } = req

            if (!first_name || !last_name) {
                return done(new Error("Every field is required."))
            }
            const user = await UserModel.findOne({ email })
            if (user) {
                return done(new Error(`You've already registered before ${email}.`))
            }
            const newUser = await UserModel.create({
                first_name,
                last_name,
                email,
                password: createHash(password),
                age,
            })
            done(null, newUser)
        })
    )

    passport.use(
        "login",
        new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
            const user = await UserModel.findOne({ email })
            if (!user) {
                return done(new Error("Invalid email or password."))
            }
            const isNotValidPass = !isValidPassword(password, user)
            if (isNotValidPass) {
                return done(new Error("Invalid email or password."))
            }
            done(null, user)
        })
    )

    const githubOpts = {
        clientID: config.githubClientId,
        clientSecret: config.githubClientSecret,
        callbackURL: "http://localhost:8080/api/auth/github/callback",
    }
    passport.use(
        "github",
        new GithubStrategy(githubOpts, async (accesstoken, refreshToken, profile, done) => {
            const email = profile._json.email
            let user = await UserModel.findOne({ email })
            if (user) {
                return done(null, user)
            }
            user = {
                first_name: profile._json.name,
                last_name: "",
                email,
                password: "",
                provider: "github",
                providerId: profile.id,
                age,
            }
            const newUser = await UserModel.create(user)
            done(null, newUser)
        })
    )

    const cookieExtractor = (req) => {
        let token = null
        if (req && req.cookies) {
            token = req.cookies["access_token"]
        }
        console.log("token", token)
        return token
    }

    passport.use(
        "jwt",
        new JwtStrategy(
            {
                secretOrKey: JWT_SECRET,
                jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
            },
            (payload, done) => {
                console.log("payload", payload)
                done(null, payload)
            }
        )
    )
}
