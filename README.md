# food-chap-chap

## create this file called config.js
    find your own jwt secret

export default {
        JWT_SECRET : "UMFpwrCZfo/+76FvY5sv71sMBVa/o32I8H9qKJGmEZc=",
        EMAIL:"audie5@ethereal.email",//testing email address by ethereal
        PASSWORD:"2dC9adwjkF9KUHY6gf",
        ATLAS_URI: "mongodb+srv://fudchapchap2:$Philip2004$@users.nucnmse.mongodb.net/?retryWrites=true&w=majority"
}

## create a .gitignore file

add this 

                #dependencies
                client/node_modules/
                server/node_modules/
                server/config.js
                client/.env
                server/.env
                config.js
                # Logs
                logs
                *.log
                npm-debug.log*
                yarn-debug.log*
                yarn-error.log*
                pnpm-debug.log*

                
                .log*

                node_modules
                dist
                dist-ssr
                *.local

                # Editor directories and files
                .vscode/*
                !.vscode/extensions.json
                .idea
                .DS_Store
                *.suo
                *.ntvs*
                *.njsproj
                *.sln
                *.sw?
                # Node.js runtime environment
                node_modules/

                # Compiled source code
                build/
                dist/

                # OS generated files
                .DS_Store
                Thumbs.db

                # Log files
                *.log

                # Environment variables
                .env

                # Client build output (React)
                client/build/

                # IDE/Editor files
                .vscode/
                .idea/

                # Dependency lock files
                yarn.lock
                package-lock.json

                # User specific files
                *.suo
                *.user
                *.sln
                *.swp
## passport.js installations

npm install passport-google-oauth2


## for the front end client 

install this
    npm install @emailjs/browser
    npm install react-google-recaptcha
    npm install react-type-animation sweetalert2 react-quill
# Generate JWT SECRET
openssl rand -base64 32 

# Create an Ethereal Email
create Ethereal Email : https://ethereal.email/create

# Add Node Node Modules By:
npm install nodemon morgan otp-generator mongodb jsonwebtoken bcrypt nodemailer

# Use this as MongoDB URL (Ask for invite if u Dont Have access)
ATLAS_URI: "mongodb+srv://fudchapchap2:$Philip2004$@users.nucnmse.mongodb.net/?retryWrites=true&w=majority" 
