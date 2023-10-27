import { Router } from "express";
const router = Router();
import passport from "passport";


/** import all controllers */
import * as controller from '../controllers/appController.js';
import { registerMail } from '../controllers/mailer.js'
import Auth, { localVariables } from '../middleware/auth.js';
import { verifyUser } from "../controllers/appController.js";


/** POST Methods */
router.route('/register').post(controller.register); // register user
router.route('/registerMail').post(registerMail); // send the email
router.route('/authenticate').post(controller.verifyUser, (req, res) => res.end()); // authenticate user
router.route('/login').post(controller.verifyUser,controller.login); // login in app
//google Authentication with Passport.js

router.route(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email'], // Define the scope based on your requirements
    })
  );
  
router.route(
    '/auth/google/redirect',
    passport.authenticate('google', {
      successRedirect: '/', // Redirect to your app's dashboard on successful authentication
      failureRedirect: '/login', // Redirect to a login page on authentication failure
    })
  );
  
/** GET Methods */
router.route('/user').get(verifyUser, controller.getUser);
router.route('/generateOTP').get(controller.verifyUser, localVariables, controller.generateOTP) // generate random OTP
router.route('/verifyOTP').get(controller.verifyUser, controller.verifyOTP) // verify generated OTP
router.route('/createResetSession').get(controller.createResetSession) // reset all the variables


/** PUT Methods */
// router.route('/updateuser').put(Auth, controller.updateUser); // is use to update the user profile
router.route('/resetPassword').put(controller.verifyUser, controller.resetPassword); // use to reset password



export default router;
