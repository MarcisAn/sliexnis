import React, { useState } from "react";
import Template from "../../components/Template";
import { firestore } from "../../firebase";
import firebase from "@firebase/app-compat";
import { useCollectionData } from "react-firebase-hooks/firestore";
import format_date from "../../util/format_date";
import dayjs from "dayjs";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import PrivateRoute from "../../components/PrivateRoute";
import style from "../../styles/task.module.scss";
import Head from "next/head";
import CreateTask from "../../components/CreateTask";

export default function dashboard() {
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);
  const [classID, setClassID] = useState("");
  const arrayUnion = firebase.firestore.FieldValue.arrayUnion;
  firestore
    .collection("users")
    .doc(firebase.auth().currentUser?.uid)
    .get()
    .then((doc) => {
      if (doc.exists) {
        setClassID(doc.data()?.classes[0]);
      }
    });
  function Task(props: any) {
    const taskTime = dayjs(props.priorityTime, "YYYY-MM-DD");
    const nowTime = dayjs(new Date());
    let diff = nowTime.diff(taskTime, "days");
    let priority = 0;
    if (diff < 0) {
      diff = 0 - diff + 1;
      priority = 1;
    } else {
      diff = 0 - diff;
      if (diff == 0) {
        priority = 0;
      } else {
        priority = -1;
      }
    }
    function taskDone(taskID: string) {
      firestore
        .collection("classes")
        .doc(classID)
        .collection("tasks")
        .doc(taskID)
        .update({
          done: arrayUnion(user.uid),
        });
    }
    if (props.done.includes(user.uid)) {
      return <span />;
    } else {
      return (
        <div className={style.task}>
          <Head>
            <title>Sliexnis | Kopskats</title>
          </Head>
          <div className={style.taskheader} style={{ marginBottom: "8px" }}>
            <span style={{ display: "flex", alignItems: "center" }}>
              <TaskPriority priority={priority} />
            </span>

            <b>
              {props.priorityTime &&
                format_date(
                  dayjs(props.priorityTime, "YYYY-MM-DD HH:mm").toDate(),
                  true
                )}
            </b>
          </div>
          <div className={style.taskheader}>
            <span className={style.subject}>{props.subject}</span>
            <TaskType type={props.type} />
          </div>
          <p>
            <b>Atlikušas dienas: </b>
            {diff}
          </p>
          <p>{props.text}</p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <button
              onClick={() => taskDone(props.id)}
              className={style.donebtn}>
              Pabeigts
            </button>
          </div>
        </div>
      );
    }
  }
  function TaskPriority(props: any) {
    switch (props.priority) {
      case -1:
        return (
          <>
            <div
              className={style.prioritydot}
              style={{
                backgroundColor: "red",
              }}
            />
            kavēts
          </>
        );
      case 0:
        return (
          <>
            <div
              className={style.prioritydot}
              style={{
                backgroundColor: "orange",
              }}
            />
            šodien
          </>
        );
      case 1:
        return (
          <>
            <div
              className={style.prioritydot}
              style={{
                backgroundColor: "green",
              }}
            />
            nav steidzams
          </>
        );

      default:
        return <span />;
    }
  }
  function TaskType(props: any) {
    switch (props.type) {
      case "online-lesson":
        return (
          <span className={style.taskType} style={{ background: "#3474eb" }}>
            Tiešsaistes stunda
          </span>
        );
      case "task":
        return (
          <div className={style.taskType} style={{ background: "orange" }}>
            Uzdevums
          </div>
        );
      case "test":
        return (
          <div className={style.taskType} style={{ background: "green" }}>
            Kontroldarbs
          </div>
        );

      default:
        return <span />;
    }
  }

  function Tasks() {
    const tasksquery = firestore
      .collection("classes")
      .doc(classID)
      .collection("tasks")
      .orderBy("priorityTime");

    const [tasks] = useCollectionData(tasksquery, { idField: "id" });

    const tasklist = tasks?.map((task) => (
      <div key={task.id}>
        <Task
          subject={task.subject}
          text={task.text}
          priorityTime={task.priorityTime}
          type={task.type}
          id={task.id}
          done={task.done}
        />
      </div>
    ));
    return <>{tasklist}</>;
  }
  return (
    <PrivateRoute>
      <Template>
        {classID != "" ? (
          <>
            <CreateTask class={classID} />
            <Tasks />
          </>
        ) : (
          <span />
        )}
      </Template>
    </PrivateRoute>
  );
}
