import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyBMqo4Rcv_wlLeaWQS7SDICRsErtXCRs-o",
    authDomain: "skola-29c56.firebaseapp.com",
    projectId: "skola-29c56",
    storageBucket: "skola-29c56.appspot.com",
    messagingSenderId: "186265093215",
    appId: "1:186265093215:web:e30702c571cf7c640707ea"
  };
const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
const analytics = firebase.analytics;
export const auth = app.auth();
export const firestore = app.firestore();
export default app;
