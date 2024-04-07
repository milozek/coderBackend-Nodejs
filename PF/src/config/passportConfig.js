import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GithubStrategy } from "passport-github2";
import UserModel from "../dao/models/userRegister.model.js";
import { createHash, isValidPassword } from "../utils.js";

export const init = () => {
  const registerOpts = {
    usernameField: "email",
    passReqToCallback: true,
  };
  passport.use(
    "register",
    new LocalStrategy(registerOpts, async (req, email, password, done) => {
      const {
        body: { first_name, last_name, age },
      } = req;

      if (!first_name || !last_name) {
        return done(new Error("Your full name is required."));
      }
      const user = await UserModel.findOne({ email });
      if (user) {
        return done(
          new Error(`A user with the email ${email} is already registered.`)
        );
      }

      const newUser = await UserModel.create({
        first_name,
        last_name,
        email,
        age,
        password: createHash(password),
      });
      done(null, newUser);
    })
  );

  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        const user = await UserModel.findOne({ email });
        if (!user) {
          return done(new Error("The entered mail or password are invalid."));
        }
        const isNotValidPass = !isValidPassword(password, user);
        if (isNotValidPass) {
          return done(new Error("The entered mail or password are invalid."));
        }
        user.last_connection = new Date();
        await user.save();
        done(null, user);
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (uid, done) => {
    const user = await UserModel.findById(uid);
    done(null, user);
  });
  const githubOptions = {
    clientID: "Iv1.3f0c1af48df6b1d2",
    clientSecret: "328c5cef22810a6ba1dbb883442b01fb6222354d",
    callbackURL: "http://localhost:8080/api/sessions/github/callback",
  };

  passport.use(
    "github",
    new GithubStrategy(
      githubOptions,
      async (accessToken, refreshToken, profile, done) => {
        console.log("GitHub Profile:", profile);
        const email = profile._json.email;

        let user = await UserModel.findOne({ email });
        if (user) {
          return done(null, user);
        }
        user = {
          first_name: profile._json.name,
          last_name: "",
          email,
          password: "",
          provider: "github",
          providerId: profile.id,
        };
        const newUser = await UserModel.create(user);
        done(null, newUser);
      }
    )
  );
};
