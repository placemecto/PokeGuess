import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCF-R-J8E2w8LprL_oROTGgRhH1CAtcE9Q",
  authDomain: "who-s-that-champion.firebaseapp.com",
  databaseURL: "https://who-s-that-champion-default-rtdb.firebaseio.com",
  projectId: "who-s-that-champion",
  storageBucket: "who-s-that-champion.appspot.com",
  messagingSenderId: "517213385382",
  appId: "1:517213385382:web:552597ce482081633a3a67",
  measurementId: "G-F6RQ3VMX2R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the database service
const database = getDatabase(app);

export default database;
