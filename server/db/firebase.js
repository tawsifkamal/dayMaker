// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZv9dDPn7XzLnpG12TY_sz52WOhO4srpg",
  authDomain: "daymaker-83ad3.firebaseapp.com",
  databaseURL: "https://daymaker-83ad3-default-rtdb.firebaseio.com",
  projectId: "daymaker-83ad3",
  storageBucket: "daymaker-83ad3.appspot.com",
  messagingSenderId: "459581815992",
  appId: "1:459581815992:web:db0c6733b8a3bfe451084d",
  measurementId: "G-YYP6K2MDZZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);