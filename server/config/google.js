import { passport } from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import ENV from "../config.js";


passport.use(
    new GoogleStrategy(
        {
            clientID: ENV.clientID,
            clientSecret: ENV.clientSecret,
            callbackURL: "/auth/google/redirect",
        }
    )
);