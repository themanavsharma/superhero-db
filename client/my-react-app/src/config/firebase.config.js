import {getApp, getApps, initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCuOHfVWfCgGvwh5NpsVEZLvEXfJxtJ75E",
    authDomain: "superherodb-75697.firebaseapp.com",
    projectId: "superherodb-75697",
    storageBucket: "superherodb-75697.appspot.com",
    messagingSenderId: "976285552189",
    appId: "1:976285552189:web:d48e3def4796a576be6454"
  };

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth }; 