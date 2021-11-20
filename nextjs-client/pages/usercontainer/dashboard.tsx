import React, { Children, useState } from "react";
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
    async function taskDone(taskID: string) {
      firestore
        .collection("classes")
        .doc(classID)
        .collection("tasks")
        .doc(taskID)
        .update({
          done: arrayUnion(user.uid),
        });
      if (process.env.NODE_ENV == "production") {
        await fetch(
          "https://api.telegram.org/bot2114478706:AAFofCxBbeY9PLXoRRG4enAlmmg7eSODMfA/sendMessage?chat_id=-1001739946551&text=" +
            "Darbs pabeigts"
        );
      }
    }

    function Task({ isDone }: any) {
      return (
        <TaskTypeContainer type={props.type}>
          <span className={style.subject}>{props.subject}</span>
          <div className={style.taskbody}>
            <span style={{ flex: "1" }}>
              <p className={style.tasktext}>{props.text}</p>
            </span>
            {isDone ? (
              <span />
            ) : (
              <div className={style.tasktime}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "end",
                  }}>
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "right",
                    }}>
                    <TaskPriority priority={priority} />
                  </span>

                  {props.priorityTime &&
                    format_date(
                      dayjs(props.priorityTime, "YYYY-MM-DD HH:mm").toDate(),
                      true
                    )}
                  <span>
                    Atl. dienas:
                    {diff}
                  </span>
                </div>
              </div>
            )}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}>
            {isDone ? (
              <span />
            ) : (
              <button
                onClick={() => taskDone(props.id)}
                className={style.donebtn}>
                Pabeigts
              </button>
            )}

            <span />
          </div>
        </TaskTypeContainer>
      );
    }
    if (props.done.includes(user.uid)) {
      return (
        <div style={{ opacity: "30%" }}>
          <Task isDone={true} />
        </div>
      );
    } else {
      return <Task isDone={false} />;
    }
  }
  function TaskPriority(props: any) {
    switch (props.priority) {
      case -1:
        return (
          <>
            <span
              className={style.prioritydot}
              style={{
                backgroundColor: "red",
              }}>
              !!!
            </span>
          </>
        );
      case 0:
        return (
          <>
            <span
              className={style.prioritydot}
              style={{
                backgroundColor: "orange",
              }}>
              !!
            </span>
          </>
        );
      case 1:
        return (
          <>
            <span
              className={style.prioritydot}
              style={{
                backgroundColor: "green",
              }}>
              !
            </span>
          </>
        );

      default:
        return <span />;
    }
  }
  function TaskTypeContainer(props: any) {
    switch (props.type) {
      case "online-lesson":
        return (
          <div
            className={style.task}
            style={{ borderColor: "var(--online-lesson)" }}>
            <h2
              className={style.taskType}
              style={{ color: "var(--online-lesson)" }}>
              Tiešsaistes stunda
            </h2>
            {props.children}
          </div>
        );
      case "task":
        return (
          <div className={style.task} style={{ borderColor: "var(--task)" }}>
            <h2 className={style.taskType} style={{ color: "var(--task)" }}>
              Uzdevums
            </h2>
            {props.children}
          </div>
        );
      case "test":
        return (
          <div className={style.task} style={{ borderColor: "var(--test)" }}>
            <h2 className={style.taskType} style={{ color: "var(--test)" }}>
              Kontroldarbs
            </h2>
            {props.children}
          </div>
        );

      default:
        return (
          <div>
            {props.children}
            {props.type}
          </div>
        );
    }
  }

  function TaskList() {
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
            <Head>
              <title>Sliexnis | Kopskats</title>
            </Head>
            <CreateTask class={classID} />
            <TaskList />
          </>
        ) : (
          <span />
        )}
      </Template>
    </PrivateRoute>
  );
}
