import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

//console.log(process.env.REACT_APP_API_KEY);

const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_APP_ID,
  projectId: process.env.REACT_APP_AUTH_DOMAIN,
  storageBucket: process.env.REACT_APP_MESSAGING_SENDER_ID,
  messagingSenderId: process.env.REACT_APP_PROJECT_ID,
  appId: process.env.REACT_APP_STORAGE_BUCKET
});

export const auth = app.auth();
export const firestore = app.firestore();
export default app;
