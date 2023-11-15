import UserModel from '../model/User.model.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ENV from '../config.js'
import otpGenerator from 'otp-generator';

export async function verifyUser(req, res, next){
    try {
        const { username, password } = req.body; // Assuming you pass the username and password during authentication

        if (!username || !password) {
            return res.status(400).send({ error: "Username and password are required" });
        }

        // Check the user's credentials
        UserModel.findOne({ username })
            .then(user => {
                bcrypt.compare(password, user.password)
                    .then(passwordCheck => {
                        if (!passwordCheck) return res.status(401).send({ error: "Invalid credentials" });
                        req.user = user; // Attach the user object to the request for later use
                        next();
                    })
                    .catch(error => {
                        return res.status(400).send({ error: "Password does not match" });
                    });
            })
            .catch(error => {
                return res.status(404).send({ error: "Username not found" });
            });

    } catch (error) {
        return res.status(500).send({ error: "Authentication Error" });
    }
}


/** POST: http://localhost:8080/api/register 
 * @param : 
*/
export async function register(req, res) {
  try {
    const { name, username, password, email, user_type, profilePic, followers, following } = req.body;

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
      name,
      username,
      user_type,
      password: hashedPassword,
      email,
      profilePic: profilePic || '',
      followers: followers || [],
      following: following || []
    });

    // Save the user to the database
    const result = await user.save();

    if (result) {
      return res.status(201).json({ msg: "User registered successfully" });
    } else {
      return res.status(500).json({ error: "User registration failed" });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Unable to register user" });
  }
}


  


/** POST: http://localhost:8080/api/login 
 * @param: {
  "username" : "example123",
  "password" : "admin123"
}
*/
export async function login(req, res) {
    const { username, password } = req.body;
  
    try {
      UserModel.findOne({ username })
        .then(user => {
          bcrypt.compare(password, user.password)
            .then(passwordCheck => {
              if (!passwordCheck) return res.status(400).send({ error: "Password does not match" });
  
              // Create a JWT token with additional user details
              const token = jwt.sign({
                userId: user._id,
                username: user.username,
                user_type: user.user_type,
                email: user.email,
                profilePic: user.profilePic,
                followers: user.followers,
                following: user.following,
                profile: user.profile,
              }, ENV.JWT_SECRET, { expiresIn: "24h" });
  
              // Return a response with the user's details and the token
              return res.status(200).send({
                msg: "Login Successful...!",
                user: {
                  username: user.username,
                  email: user.email,
                  user_type:user.user_type,
                  profilePic: user.profilePic,
                  followers: user.followers,
                  following: user.following,
                  profile: user.profile,
                },
                token,
              });
  
            })
            .catch(error => {
              return res.status(400).send({ error: "Password does not match" });
            })
        })
        .catch(error => {
          return res.status(404).send({ error: "Username not found" });
        });
  
    } catch (error) {
      return res.status(500).send({ error });
    }
  }
  


/** GET: http://localhost:8080/api/user */
export async function getUser(req, res) {
    try {
        if (!req.user) return res.status(401).send({ error: "Authentication required" });

        // The user object is attached to the request, so you can access it directly
        const user = req.user;

        // Remove password from user
        const { password, ...rest } = user.toJSON();

        return res.status(200).send(rest);
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


/** GET: http://localhost:8080/api/verifyOTP */
export async function verifyOTP(req,res){
    const { code } = req.query;
    if(parseInt(req.app.locals.OTP) === parseInt(code)){
        req.app.locals.OTP = null; // reset the OTP value
        req.app.locals.resetSession = true; // start session for reset password
        return res.status(201).send({ msg: 'Verify Successsfully!'})
    }
    return res.status(400).send({ error: "Invalid OTP"});
}


// successfully redirect user when OTP is valid
/** GET: http://localhost:8080/api/createResetSession */
export async function createResetSession(req,res){
   if(req.app.locals.resetSession){
        return res.status(201).send({ flag : req.app.locals.resetSession})
   }
   return res.status(440).send({error : "Session expired!"})
}


// update the password when we have valid session
/** PUT: http://localhost:8080/api/resetPassword */
export async function resetPassword(req,res){
    try {
        
        if(!req.app.locals.resetSession) return res.status(440).send({error : "Session expired!"});

        const { username, password } = req.body;

        try {
            
            UserModel.findOne({ username})
                .then(user => {
                    bcrypt.hash(password, 10)
                        .then(hashedPassword => {
                            UserModel.updateOne({ username : user.username },
                            { password: hashedPassword}, function(err, data){
                                if(err) throw err;
                                req.app.locals.resetSession = false; // reset session
                                return res.status(201).send({ msg : "Record Updated...!"})
                            });
                        })
                        .catch( e => {
                            return res.status(500).send({
                                error : "Enable to hashed password"
                            })
                        })
                })
                .catch(error => {
                    return res.status(404).send({ error : "Username not Found"});
                })

        } catch (error) {
            return res.status(500).send({ error })
        }

    } catch (error) {
        return res.status(401).send({ error })
    }
} 