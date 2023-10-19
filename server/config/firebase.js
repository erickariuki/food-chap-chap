// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD7etljWyRUH4u-7Cz80C-Owmsm5FNvtho",
  authDomain: "foodchapchap-auth.firebaseapp.com",
  projectId: "foodchapchap-auth",
  storageBucket: "foodchapchap-auth.appspot.com",
  messagingSenderId: "910844622670",
  appId: "1:910844622670:web:588797d7ef175208e4501f",
  measurementId: "G-WLBXTX37BY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);