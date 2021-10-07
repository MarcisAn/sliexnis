import CreateTask from "./CreateTask";

export default function Overview(props: any) {
  function Task(props: any) {
    return (
      <div
        style={{
          background: "burlywood",
          color: "black",
          margin: "auto",
          width: "30%",
        }}>
        <h4>Mācību priekšmets</h4>
        <p>Uzdevuma teksts</p>
      </div>
    );
  }

  return (
    <div>
      <CreateTask classs={props.classs} />
      <h2>Pārskats</h2>
      <Task />
    </div>
  );
}
