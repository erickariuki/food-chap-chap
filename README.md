# food-chap-chap

# Create A file in the Server Part Called Config.js
"Config.js"

# Generate JWT SECRET
openssl rand -base64 32 

# Create an Ethereal Email
create Ethereal Email : https://ethereal.email/create

# Add Node Node Modules By:
npm install nodemon morgan otp-generator mongodb jsonwebtoken bcrypt nodemailer cors

# Use this as MongoDB URL (Ask Philip for Invite if You Dont Have Access)
ATLAS_URI: "mongodb+srv://fudchapchap2:$Philip2004$@users.nucnmse.mongodb.net/?retryWrites=true&w=majority" 

# Config.js Format
export default { JWT_SECRET : <Generate Your Own>, EMAIL:<Create it with the link below>,//testing email address by ethereal PASSWORD:<ethereal email comes with password>, ATLAS_URI: "mongodb+srv://fudchapchap2:$Philip2004$@users.nucnmse.mongodb.net/?retryWrites=true&w=majority" }


##  to start server not nodemon server.js

npm start
