import { useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import Close from "../assets/icons/close.svg";
import { firestore } from "../firebase";
import firebase from "firebase/app";
export default function CreateClass() {
  const [school, setSchool] = useState("");
  const [classs, setClass] = useState("");
  const [classCreated, setClassCreated] = useState(false);
  const [classID, setClassID] = useState("");
  const arrayUnion = firebase.firestore.FieldValue.arrayUnion;

  function createClass(e: any) {
    e.preventDefault();

    if (school.length < 2) {
      alert("Skolas un klases nosaukumam jābūt garākam par 2 simboliem");
    } else {
      firestore
        .collection("classes")
        .add({
          admin: firebase.auth().currentUser?.uid,
          school: school,
          class: classs,
          users: arrayUnion(firebase.auth().currentUser?.uid),
        })
        .then(function (docRef) {
          setClassID(docRef.id);
          setClassCreated(true);
        });
    }
  }
  function addClassToUser() {
    firestore
      .collection("users")
      .doc(firebase.auth().currentUser?.uid)
      .update({
        classes: arrayUnion(classID),
      });
  }
  return (
    <Popup
      modal
      trigger={<button className="button">Izveidot klasi</button>}
      position="right center"
      onClose={() => console.log("aizverts")}>
      {(close: any) => (
        <div>
          {classCreated ? (
            <div>
              <h1 style={{ color: "black" }}>Klase veiksmīgi izveidota</h1>
              <p style={{ color: "black" }}>
                Klases ID nummurs ir: <b>{classID}</b>
              </p>
              <button onClick={() => navigator.clipboard.writeText(classID)}>
                Kopēt
              </button>
              <p style={{ color: "black" }}>
                Taviem klasesbiedriem šis nummurs būs vajadzīgs lai pievienotos
                klasei
              </p>
              <button onClick={addClassToUser}>ok</button>
            </div>
          ) : (
            <div>
              <img
                src={Close}
                onClick={close}
                alt="close the modal"
                style={{ width: "35px" }}
              />
              <h1 style={{ color: "black" }}>Izveidot klasi</h1>
              <form onSubmit={createClass}>
                <label style={{ color: "black" }}>Skola</label>
                <input
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                />
                <label style={{ color: "black" }}>Klase</label>
                <input
                  value={classs}
                  onChange={(e) => setClass(e.target.value)}
                />
                <input type="submit" value="Izveidot klasi" />
              </form>
            </div>
          )}
        </div>
      )}
    </Popup>
  );
}
