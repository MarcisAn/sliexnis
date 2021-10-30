import Popup from "reactjs-popup";
import { useCollectionDataOnce } from "react-firebase-hooks/firestore";
import { firestore } from "../firebase";
import { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import style from "../styles/createtask.module.scss";

export default function CreateTask(props: any) {
  const subjectsquery = firestore
    .collection("classes")
    .doc(props.class)
    .collection("subjects");
  const [subjects] = useCollectionDataOnce(subjectsquery, { idField: "id" });

  const [selectedType, setSelectedType] = useState("task");
  const [selectedSubject, setSelectedSubject] = useState("default");
  const [taskText, setTaskText] = useState("");

  const [hasStartTime, setHasStartTime] = useState(true);
  const [hasEndTime, setHasEndTime] = useState(true);

  const [startTime, setStartTime] = useState("");
  const [startTimeHr, setStartTimeHr] = useState("00");
  const [startTimeMin, setStartTimeMin] = useState("00");

  const [endTime, setEndTime] = useState("");
  const [endTimeHr, setEndTimeHr] = useState("00");
  const [endTimeMin, setEndTimeMin] = useState("00");

  function Subjects() {
    const subjectsList = subjects?.map((subject) => (
      <option key={subject.name.toLowerCase()} value={subject.name}>
        {subject.name}
      </option>
    ));

    return <>{subjectsList}</>;
  }

  useEffect(() => {
    switch (selectedType) {
      case "online-lesson":
        setHasEndTime(false);
        setHasStartTime(true);
        break;
      case "task":
        setHasEndTime(true);
        setHasStartTime(false);
        break;
      case "test":
        setHasEndTime(false);
        setHasStartTime(true);
        break;

      default:
        break;
    }
  }, [selectedType]);

  function addTask(e: any, close: any) {
    e.preventDefault();
    const taskData = {
      userAdded: firebase.auth().currentUser?.uid,
      timeAdded: firebase.firestore.FieldValue.serverTimestamp(),
      type: selectedType,
      subject: selectedSubject,
      text: taskText,
      done: [],
    };
    if (hasStartTime) {
      const startTimeObj = {
        startTime: startTime + " " + startTimeHr + ":" + startTimeMin,
      };
      Object.assign(taskData, startTimeObj);
    }
    if (hasEndTime) {
      const endTimeObj = {
        endTime: endTime + " " + endTimeHr + ":" + endTimeMin,
      };
      Object.assign(taskData, endTimeObj);
    }
    switch (selectedType) {
      case "task":
        const prorityTimeObjTask = {
          priorityTime: endTime + " " + endTimeHr + ":" + endTimeMin,
        };
        Object.assign(taskData, prorityTimeObjTask);
        break;
      case "test":
        const prorityTimeObjTest = {
          priorityTime: startTime + " " + startTimeHr + ":" + startTimeMin,
        };
        Object.assign(taskData, prorityTimeObjTest);
        break;
      case "online-lesson":
        const prorityTimeObjLesson = {
          priorityTime: startTime + " " + startTimeHr + ":" + startTimeMin,
        };
        Object.assign(taskData, prorityTimeObjLesson);
        break;
      default:
        break;
    }
    //eslint-disable-next-line
    if (selectedSubject != "--") {
      firestore
        .collection("classes")
        .doc(props.class)
        .collection("tasks")
        .add(taskData);
      close();
      setEndTime("");
      setStartTime("");
      setSelectedSubject("");
      setSelectedType("");
      setTaskText("");
    } else {
      alert("Ievadi priekšmetu");
    }
  }
  function changeStartTime() {
    if (hasStartTime) {
      setHasStartTime(false);
    } else {
      setHasStartTime(true);
    }
  }
  function changeEndTime() {
    if (hasEndTime) {
      setHasEndTime(false);
    } else {
      setHasEndTime(true);
    }
  }

  function Time() {
    const numbers = [];
    for (let i = 0; i < 24; i++) {
      if (i <= 9) {
        numbers.push("0" + i);
      } else {
        numbers.push(i);
      }
    }
    const listItems = numbers.map((number) => (
      <option key={number} value={number}>
        {number}
      </option>
    ));
    return <>{listItems}</>;
  }

  return (
    <Popup
      modal
      trigger={
        <button className="button" style={{ margin: "1em" }}>
          Pievienot uzdevumu
        </button>
      }
      position="right center"
      className={style.createtask}>
      {(close: any) => (
        <div style={{ color: "black" }}>
          <h2>Pievienot uzdevumu</h2>
          <form
            onSubmit={(e) => addTask(e, close)}
            className="add-task-form"
            style={{ display: "flex", flexDirection: "column" }}>
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
            <div className="time-selector">
              <label htmlFor="start-time">Sākuma laiks</label>
              <input
                id="start-time"
                type="checkbox"
                checked={hasStartTime}
                onChange={changeStartTime}
              />
              <input
                type="date"
                id="start"
                name="trip-start"
                disabled={!hasStartTime}
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}></input>
              <select
                value={startTimeHr}
                onChange={(e) => setStartTimeHr(e.target.value)}
                disabled={!hasStartTime}>
                <Time />
              </select>
              <select
                value={endTimeMin}
                onChange={(e) => setEndTimeMin(e.target.value)}
                disabled={!hasStartTime}>
                <Time />
              </select>
            </div>
            <div className="time-selector">
              <label htmlFor="end-time">Beigu laiks</label>
              <input
                id="end-time"
                type="checkbox"
                checked={hasEndTime}
                onChange={changeEndTime}
              />
              <input
                type="date"
                id="start"
                name="trip-start"
                disabled={!hasEndTime}
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}></input>
              <select
                value={endTimeHr}
                onChange={(e) => setEndTimeHr(e.target.value)}
                disabled={!hasEndTime}>
                <Time />
              </select>
              <select
                value={endTimeMin}
                onChange={(e) => setEndTimeMin(e.target.value)}
                disabled={!hasEndTime}>
                <Time />
              </select>
            </div>

            <input type="submit" value="Pievienot" />
          </form>
        </div>
      )}
    </Popup>
  );
}
