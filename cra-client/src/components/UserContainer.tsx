import Dashboard from "./Dashboard";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { firestore } from "../firebase";
import firebase from "firebase/app";
import { useEffect, useState } from "react";
import CreateClass from "./CreateClass";
import LogOut from "./auth/LogOut";

export default function UserContainer() {
  const userRolesQuery = firestore
    .collection("users")
    .doc(firebase.auth().currentUser?.uid);
  const [value] = useDocumentData(userRolesQuery, { idField: "id" });
  const [hasClasses, setClasses] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const arrayUnion = firebase.firestore.FieldValue.arrayUnion;

  useEffect(() => {
    firestore
      .collection("users")
      .doc(firebase.auth().currentUser?.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setIsRegistered(true);
        } else {
          firestore
            .collection("users")
            .doc(firebase.auth().currentUser?.uid)
            .set({
              email: firebase.auth().currentUser?.email,
              classes: [],
            });
          setIsRegistered(true);
        }
      });
  }, []);

  function Classes(props: any) {
    const classes = props.value.classes;
    // eslint-disable-next-line
    if (classes == undefined) {
      setClasses(false);
    } else {
      // eslint-disable-next-line
      if (classes == 0) {
        setClasses(false);
      } else {
        setClasses(true);
      }
    }

    //const listItems = classes.map((userClass: any) => (
    //  <UserClass userclass={userClass} key={userClass} />
    //));

    return <span />;
  }

  function NoClass() {
    const [groupID, setGroupID] = useState("");
    const [error, setError] = useState("");

    async function joinClass(e: any) {
      e.preventDefault();
      const docRef = firestore.collection("classes").doc(groupID);
      const doc = await docRef.get();
      console.log(doc.data());
      // eslint-disable-next-line
      if (doc.data() == undefined) {
        setError("Klases ID nummurs neeksistē");
        alert("Klases ID nummurs neeksistē");
      } else {
        firestore
          .collection("users")
          .doc(firebase.auth().currentUser?.uid)
          .update({
            classes: arrayUnion(groupID),
          });
        firestore
          .collection("classes")
          .doc(groupID)
          .update({
            users: arrayUnion(firebase.auth().currentUser?.uid),
          });
      }
    }
    return (
      <div>
        <LogOut />
        <div style={{ textAlign: "center" }}>
          <h1>Labdien!</h1>
          <h2>{value?.name}</h2>
        </div>
        <h2>Tu šobrīd neesi reģistrēts nevienā klasē</h2>
        {error}

        <form onSubmit={joinClass}>
          <label>Klases ID nummurs</label>
          <input
            type="text"
            value={groupID}
            onChange={(e) => setGroupID(e.target.value)}
          />
          <input type="submit" value="Pievienoties" />
        </form>
        <CreateClass />
      </div>
    );
  }
  function UserView() {
    return (
      <div>
        {value ? <Classes value={value} /> : <span />}
        {hasClasses ? <Dashboard class={value?.classes[0]} /> : <NoClass />}
      </div>
    );
  }

  return <div>{isRegistered ? <UserView /> : <span />}</div>;
}
