import { useCollectionData } from "react-firebase-hooks/firestore";
import { firestore } from "../../firebase";
import format_date from "../../util/format_date";
import CreateTask from "./CreateTask";
import "../../styles/overview.scss";
import { useState } from "react";
import moment, { now } from "moment";

export default function Overview(props: any) {
  const tasksquery = firestore
    .collection("classes")
    .doc(props.classs)
    .collection("tasks")
    .orderBy("priorityTime");

  const [tasks] = useCollectionData(tasksquery, { idField: "id" });
  const [filtersExpanded, setFiltersExpanded] = useState(false);
  const [filter, setFilterValue] = useState("priority");

  function Task(props: any) {
    const taskTime = moment(props.priorityTime, "YYYY-MM-DD");
    const nowTime = moment(new Date());
    let diff = nowTime.diff(taskTime, "days");
    let prority = "";
    if (diff < 0) {
      diff = 0 - diff + 1;
      prority = "Nav steidzams";
    } else {
      diff = 0 - diff;
      if (diff == 0) {
        prority = "Šodien";
      } else {
        prority = "Kavēts";
      }
    }

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
          <b>{props.type === "task" ? "Izpildes laiks: " : "Laiks: "}</b>
          {props.priorityTime &&
            format_date(
              moment(props.priorityTime, "YYYY-MM-DD").toDate(),
              props.type === "online-lesson" ? true : false
            )}
        </p>
        <p>
          <b>Atlikušas dienas: </b>
          {diff}
          {" " + prority}
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
          priorityTime={task.priorityTime}
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
  function setFilter(e: any) {
    console.log(e);
    setFilterValue(e);
    switch (e) {
      case "subject":
        break;

      default:
        break;
    }
  }

  function Filters() {
    return (
      <div className="filters">
        <h2>Filtri</h2>
        <h3>Kārtot pēc</h3>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="priority">Prioritātes</option>
          <option value="added-time">Pievienošanas laika</option>
          <option value="subject">Mācību priekšmeta (alfabētiski)</option>
          <option value="type">Uzdevuma veida</option>
        </select>
      </div>
    );
  }

  return (
    <div className="overview">
      <CreateTask classs={props.classs} />
      <h2>Pārskats</h2>
      <div className="tasks-container">
        <div className="tasks-column">{tasks ? <Tasks /> : <span />}</div>

        {filtersExpanded ? <Filters /> : <span />}
        <div className="filter-button">
          <button onClick={() => setFiltersExpanded(!filtersExpanded)}>
            Filtri
          </button>
        </div>
      </div>
    </div>
  );
}
