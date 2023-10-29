
  import passport from 'passport';
  import { Strategy as GoogleStrategy } from "passport-google-oauth2";
  import ENV from "../config.js";
  
  passport.use(
    new GoogleStrategy(
      {
        clientID: ENV.clientID,
        clientSecret: ENV.clientSecret,
        callbackURL: "/auth/google/redirect",
      },
      async (accessToken, refreshToken, profile, done) => {
          const id = profile.id;
          const email = profile.emails[0].value;
          const firstName = profile.name.givenName;
          const lastName = profile.name.familyName;
          const profilePhoto = profile.photos[0].value;
          const source = "google";
    
    
          const currentUser = await getUserByEmail({ email })
    
          if (!currentUser) {
            const newUser = await addGoogleUser({
              id,
              email,
              firstName,
              lastName,
              profilePhoto
            })
            return done(null, newUser);
          }
    
          if (currentUser.source != "google") {
            //return error
            return done(null, false, { message: `You have previously signed up with a different signin method` });
          }
    
          currentUser.lastVisited = new Date();
          return done(null, currentUser);
        }
      )
    );
  