import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import FirebaseSecrets from "./secrets.json";

const app = firebase.initializeApp(FirebaseSecrets);

export const auth = app.auth();
export const firestore = app.firestore();
export default app;
