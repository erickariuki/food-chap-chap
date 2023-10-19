import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import otpGenerator from 'otp-generator';
import UserModel from '../model/User.model.js'; // Import your UserModel schema
import ENV from '../config.js';

/** Middleware for verifying user existence */
export async function verifyUser(req, res, next) {
    try {
        const { username } = req.method == "GET" ? req.query : req.body;
        const user = await UserModel.findOne({ username });
        if (!user) return res.status(404).send({ error: "Can't find User!" });
        req.user = user; // Attach user object to request for later use if needed
        next();
    } catch (error) {
        return res.status(404).send({ error: "Authentication Error" });
    }
}


/** POST: Register a new user */
export async function register(req, res) {
    try {
        const { name, username, password, email, profilePic } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new UserModel({
            name,
            username,
            email,
            password: hashedPassword,
            profilePic: profilePic || '',
            followers: [],
            following: []
        });

        await newUser.save();
        return res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}


/** POST: http://localhost:8080/api/register 
 * @param : {
  "username" : "example123",
  "password" : "admin123",
  "email": "example@gmail.com",
  "firstName" : "bill",
  "lastName": "william",
  "mobile": 8009860560,
  "address" : "Apt. 556, Kulas Light, Gwenborough",
  "profile": ""
}
*/
export async function register(req, res) {
    try {
      const { username, password, profile, email } = req.body;
  
      // Check for existing username
      const usernameExists = await UserModel.findOne({ username });
      if (usernameExists) {
        return res.status(400).json({ error: "Please use a unique username" });
      }
  
      // Check for existing email
      const emailExists = await UserModel.findOne({ email });
      if (emailExists) {
        return res.status(400).json({ error: "Please use a unique email" });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const user = new UserModel({
        username,
        password: hashedPassword,
        profile: profile || "",
        email,
      });
  
      // Save the user to the database
      const result = await user.save();
  
      if (result) {
        return res.status(201).json({ msg: "User registered successfully" });
      } else {
        return res.status(500).json({ error: "User registration failed" });
      }
    } catch (error) {
      return res.status(500).json({ error: "Unable to register user" });
    }
  }
  


/** POST: Login user */
export async function login(req, res) {
    const { username, password } = req.body;
    try {
        const user = req.user; // User object attached by verifyUser middleware
        const passwordCheck = await bcrypt.compare(password, user.password);

        if (!passwordCheck) return res.status(400).send({ error: "Invalid Password" });

        const token = jwt.sign({
            userId: user._id,
            username: user.username
        }, ENV.JWT_SECRET, { expiresIn: "24h" });

        return res.status(200).send({
            msg: "Login Successful...!",
            username: user.username,
            token
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: "Internal Server Error" });
    }
}

/** GET: Get user details by username */
export async function getUser(req, res) {
    try {

        const user = req.user; // User object attached by verifyUser middleware
        const { password, ...rest } = user.toJSON();
        return res.status(200).json(rest);
    } catch (error) {
        return res.status(500).send({ error: "Internal Server Error" });
    }
}

/** PUT: Update user details */
export async function updateUser(req, res) {
    try {
        const userId = req.user._id; // User ID attached by verifyUser middleware
        const body = req.body;
        await UserModel.updateOne({ _id: userId }, body);
        return res.status(200).send({ msg: "Record Updated...!" });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: "Internal Server Error" });
    }
}

/** GET: Generate OTP */
export async function generateOTP(req, res) {
    try {
        const OTP = await otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
        req.app.locals.OTP = OTP;
        return res.status(201).send({ code: OTP });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: "Internal Server Error" });
    }

        if (!username) return res.status(501).send({ error: "Invalid Username" });
    
        const user = await UserModel.findOne({ username });
    
        if (!user) {
            return res.status(404).send({ error: "User not found" });
        }
    
        // Remove password from user
        const { password, ...rest } = user.toJSON();
    
        return res.status(201).send(rest);
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send({ error: "An error occurred" });
    }
    

}


/** PUT: http://localhost:8080/api/updateuser 
 * @param: {
  "header" : "<token>"
}
body: {
    firstName: '',
    address : '',
    profile : ''
}
*/
// export async function updateUser(req, res) {
//     try {
//       const { userId } = req.user;
  
//       if (!userId) {
//         return res.status(401).json({ error: "Authentication Failed" });
//       }
  
//       const body = req.body;
  
//       // Check if the user has the necessary permissions to update the data (authorization logic).
  
//       // Update the data using promises with Mongoose
//       const result = await UserModel.updateOne({ _id: userId }, body);
  
//       if (result.nModified === 0) {
//         return res.status(404).json({ error: "No records updated" });
//       }
  
//       return res.status(201).json({ msg: "Record Updated" });
//     } catch (error) {
//       console.error("Error:", error);
//       return res.status(500).json({ error: "Internal Server Error" });
//     }
//   }
  
  
/** GET: http://localhost:8080/api/generateOTP */
export async function generateOTP(req,res){
    req.app.locals.OTP = await otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false})
    res.status(201).send({ code: req.app.locals.OTP })

}

/** GET: Verify OTP */
export async function verifyOTP(req, res) {
    const { code } = req.query;
    const serverOTP = req.app.locals.OTP;
    if (serverOTP && parseInt(serverOTP) === parseInt(code)) {
        req.app.locals.OTP = null; // Reset the OTP value
        req.app.locals.resetSession = true; // Start session for reset password
        return res.status(200).send({ msg: 'Verify Successfully!' });
    }
    return res.status(400).send({ error: "Invalid OTP" });
}

/** GET: Check if reset session is active */
export async function createResetSession(req, res) {
    if (req.app.locals.resetSession) {
        return res.status(200).send({ flag: req.app.locals.resetSession });
    }
    return res.status(440).send({ error: "Session expired!" });
}

/** PUT: Reset user password */
export async function resetPassword(req, res) {
    try {
        if (!req.app.locals.resetSession) return res.status(440).send({ error: "Session expired!" });
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        await UserModel.updateOne({ username: username }, { password: hashedPassword });
        req.app.locals.resetSession = false; // Reset session after password reset
        return res.status(200).send({ msg: "Password Reset Successfully!" });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: "Internal Server Error" });
    }
}
