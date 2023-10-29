import { serializeUser, deserializeUser } from "passport";
import { findOne } from "../user/user.model";

serializeUser((user, done) => {
  done(null, user.id);
});

deserializeUser(async (id, done) => {
  const currentUser = await findOne({ id });
  done(null, currentUser);
});