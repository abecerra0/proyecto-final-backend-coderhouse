import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import dotenv from "dotenv";
import User from "../models/users.model.js";
import { usersManager } from "../dao/index.dao.js";
import { compareHash, createHash } from "../utils/hash.util.js";
import { createToken } from "../utils/token.util.js";
import crypto from "crypto";
import verifyAccount from "../utils/verifyAccount.util.js";
dotenv.config();

passport.use(
  "register",
  new LocalStrategy(
    {
      passReqToCallback: true,
      usernameField: "email",
    },
    async (req, email, password, done) => {
      try {
        const one = await User.findOne({ email });
        if (one) {
          return done(null, null, { message: "Invalido", statusCode: 401 });
        }
        const verifyCode = crypto.randomBytes(12).toString("hex");
        req.body.verifyCode = verifyCode;
        const user = await User.create(req.body);
        await verifyAccount({ to: email, verifyCode });
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  "login",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return done(null, null, { message: "Invalido", statusCode: 401 });
        }
        const verifyUser = user.verify;
        if (!verifyUser) {
          return done(null, null, { message: "Invalido", statusCode: 401 });
        }
        const verifyPassword = compareHash(password, user.password);
        if (!verifyPassword) {
          return done(null, null, { message: "Invalido", statusCode: 401 });
        }
        const token = createToken({
          email: user.email,
          role: user.role,
          user_id: user._id,
        });
        req.token = token;
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  "jwt-auth",
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_KEY,
    },
    async (data, done) => {
      try {
        const { user_id } = data;
        const user = await User.findById(user_id);
        if (!user) {
          return done();
        }
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  "jwt-adm",
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([(req) => req?.cookies?.token]),
      secretOrKey: process.env.JWT_KEY,
    },
    async (data, done) => {
      try {
        const { user_id, role } = data;
        const user = await User.findById(user_id);

        if (!user || user.role !== "ADMIN") {
          return done(null, false);
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

export default passport;
