import { Router } from "express";
const router = Router();
import passport from "passport";
import axios from "axios";

/** import all controllers */
import * as controller from '../controllers/appController.js';
import { registerMail } from '../controllers/mailer.js'
import Auth, { localVariables } from '../middleware/auth.js';



/** POST Methods */
router.route('/register').post(controller.register); // register user
router.route('/registerMail').post(registerMail); // send the email
router.route('/authenticate').post(controller.verifyUser, (req, res) => res.end()); // authenticate user
router.route('/login').post(controller.verifyUser,controller.login); // login in app
//google Authentication with Passport.js

router.get('/auth/google/callback', async (req, res) => {
  try {
    const { access_token } = req.query;

    const response = await axios.get(`https://www.googleapis.com/plus/v1/people/me`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    // Save user information to your database
    const user = response.data;

    // Redirect to your application's homepage or dashboard
    res.redirect('http://localhost:4000');
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
});
  
/** GET Methods */
router.route('/user/:username').get(controller.getUser) // user with username
router.route('/generateOTP').get(controller.verifyUser, localVariables, controller.generateOTP) // generate random OTP
router.route('/verifyOTP').get(controller.verifyUser, controller.verifyOTP) // verify generated OTP
router.route('/createResetSession').get(controller.createResetSession) // reset all the variables


/** PUT Methods */
// router.route('/updateuser').put(Auth, controller.updateUser); // is use to update the user profile
router.route('/resetPassword').put(controller.verifyUser, controller.resetPassword); // use to reset password



export default router;
