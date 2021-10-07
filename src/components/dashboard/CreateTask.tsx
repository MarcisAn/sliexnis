import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import Close from "../../assets/icons/close.svg";
import { useCollectionDataOnce } from "react-firebase-hooks/firestore";
import { firestore } from "../../firebase";
import { useState } from "react";
import firebase from "firebase/app";
export default function CreateTask(props: any) {
  const userRolesQuery = firestore
    .collection("classes")
    .doc(props.classs)
    .collection("subjects");
  const [subjects] = useCollectionDataOnce(userRolesQuery, { idField: "id" });
  const [selectedType, setSelectedType] = useState("online-lesson");
  const [selectedSubject, setSelectedSubject] = useState("default");
  const [taskText, setTaskText] = useState("");

  function Subjects() {
    const subjectsList = subjects?.map((subject) => (
      <option
        key={subject.name.toLowerCase()}
        value={subject.name.toLowerCase()}>
        {subject.name}
      </option>
    ));

    return <>{subjectsList}</>;
  }
  function addTask(e: any) {
    e.preventDefault();
    firestore.collection("classes").doc(props.classs).collection("tasks").add({
      userAdded: firebase.auth().currentUser?.uid,
      timeAdded: firebase.firestore.FieldValue.serverTimestamp(),
      type: selectedType,
      subject: selectedSubject,
      text: taskText,
    });
  }
  return (
    <Popup
      modal
      trigger={<button className="button">Pievienot uzdevumu</button>}
      position="right center">
      {(close: any) => (
        <div style={{ color: "black" }}>
          <img
            src={Close}
            onClick={close}
            alt="close the modal"
            style={{ width: "35px" }}
          />
          <h2>Pievienot uzdevumu</h2>
          <form onSubmit={addTask}>
            <label htmlFor="type">Uzdevuma veids</label>
            <select
              onChange={(e) => setSelectedType(e.target.value)}
              value={selectedType}
              name="type"
              id="types">
              <option value="online-lesson">Tiešsaistes stunda</option>
              <option value="task">Uzdevums</option>
              <option value="test">Pārbaudes darbs</option>
            </select>
            <label htmlFor="subjects">Mācību priekšmets</label>
            <select
              name="subjects"
              id="subjects"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}>
              <option value="default">--</option>
              {subjects && <Subjects />}
            </select>
            <label>Uzdevums</label>
            <textarea
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}></textarea>
            <input type="submit" value="Pievienot" />
          </form>
        </div>
      )}
    </Popup>
  );
}
