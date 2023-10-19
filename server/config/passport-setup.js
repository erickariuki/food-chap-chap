import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import ENV from '../config.js';
import User from '../model/User.model.js'; // Import the User model

passport.use(new GoogleStrategy({
  clientID: ENV.clientID,
  clientSecret: ENV.clientSecret,
  callbackURL: '/auth/google/redirect',
},
 async (request, accessToken, refreshToken, profile, done) => {
  try {
    // Check if the user already exists in the database based on their Google ID
    let user = await User.findOne({ googleId: profile.id });

    if (!user) {
      // If the user doesn't exist, create a new user
      user = new User({
        googleId: profile.id,
        displayName: profile.displayName,
        // Add more fields as needed
      });
      await user.save();
    }

    return done(null, user);
  } catch (error) {
    return done(error, null);
  }
}));

// Serialize and deserialize user functions are required as well
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// Export passport or use it in your application
export default passport;

