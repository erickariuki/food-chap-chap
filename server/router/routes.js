import { Router } from "express";
import bcrypt from 'bcrypt';
import UserModel from '../model/User.model.js';
import * as controller from '../controllers/appController.js';
import { registerMail } from '../controllers/mailer.js';
import Auth, { localVariables } from '../middleware/auth.js';

const router = Router();

/** POST Methods */
router.route(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email'], 
    })
  );
  
router.route(
    '/auth/google/redirect',
    passport.authenticate('google', {
      successRedirect: '/', 
      failureRedirect: '/login', 
    })
  );

router.route('/register').post(controller.register); // Register user
router.route('/registerMail').post(registerMail); // Send email for registration
router.route('/authenticate').post(controller.verifyUser, (req, res) => res.end()); // Authenticate user
router.route('/login').post(controller.verifyUser, controller.login); // Login user

/** GET Methods */
router.route('/user/:username').get(controller.getUser); // Get user by username
router.route('/generateOTP').get(controller.verifyUser, localVariables, controller.generateOTP); // Generate random OTP
router.route('/verifyOTP').get(controller.verifyUser, controller.verifyOTP); // Verify generated OTP
router.route('/createResetSession').get(controller.createResetSession); // Reset all the variables

/** PUT Methods */
router.route('/updateuser').put(Auth, controller.updateUser); // Update user profile
router.route('/resetPassword').put(controller.verifyUser, async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        await UserModel.updateOne({ username: username }, { password: hashedPassword });
        req.app.locals.resetSession = false; // Reset session after password reset
        return res.status(200).send({ msg: "Password Reset Successfully!" });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: "Internal Server Error" });
    }
}); // Reset password

export default router;
