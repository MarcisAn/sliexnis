import { useEffect, useRef, useState } from "react";
import LogOut from "./auth/LogOut";
import { firestore } from "../firebase";
import firebase from "firebase/app";
import { useCollectionData } from "react-firebase-hooks/firestore";

export default function Dashboard() {
  return (
    <>
      <h1>Dasboard</h1>
    </>
  );
}
