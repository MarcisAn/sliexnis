import { useCollectionData } from "react-firebase-hooks/firestore";
import { firestore } from "../../firebase";
import format_date from "../../util/format_date";
import CreateTask from "./CreateTask";

export default function Overview(props: any) {
  const tasksquery = firestore
    .collection("classes")
    .doc(props.classs)
    .collection("tasks");
  const [tasks] = useCollectionData(tasksquery, { idField: "id" });

  function Task(props: any) {
    return (
      <div
        style={{
          background: "burlywood",
          color: "black",
          margin: "auto",
          width: "30%",
        }}>
        <h4>{props.subject}</h4>
        <p>{props.text}</p>
        <p>
          <b>Pievienots </b>
          {props.date && format_date(props.date)}
        </p>
        <TaskType type={props.type} />
      </div>
    );
  }
  function Tasks() {
    const tasklist = tasks?.map((task) => (
      <div key={task.id}>
        <Task
          subject={task.subject}
          text={task.text}
          date={task.timeAdded}
          type={task.type}
        />
      </div>
    ));
    return <>{tasklist}</>;
  }

  function TaskType(props: any) {
    switch (props.type) {
      case "online-lesson":
        return (
          <div style={{ background: "lightblue" }}>Tiešsaistes stunda</div>
        );
      case "task":
        return <div style={{ background: "orange" }}>Uzdevums</div>;
      case "test":
        return <div style={{ background: "green" }}>Kontroldarbs</div>;

      default:
        return <span />;
    }
  }

  return (
    <div>
      <CreateTask classs={props.classs} />
      <h2>Pārskats</h2>
      {tasks ? <Tasks /> : <span />}
    </div>
  );
}
