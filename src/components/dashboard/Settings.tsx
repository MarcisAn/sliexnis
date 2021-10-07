import { useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Popup from "reactjs-popup";
import { firestore } from "../../firebase";
import Close from "../../assets/icons/close.svg";

export default function Settings(props: any) {
  const userRolesQuery = firestore
    .collection("classes")
    .doc(props.classs)
    .collection("subjects");
  const [subjects] = useCollectionData(userRolesQuery, { idField: "id" });
  const [selected, setSeleted] = useState("");
  const [currentClass] = useState(props.classs);

  function Subject(props: any) {
    console.log(props);

    const [isEditable, setIsEditable] = useState(false);
    const [onlineURL, setOnlineURL] = useState(props.subject.onlineURL);
    const [name, setName] = useState(props.subject.name);

    function saveChanges() {
      setIsEditable(false);
      try {
        //eslint-disable-next-line
        if (onlineURL == undefined) {
          setOnlineURL("");
        }
        console.log(name);
        console.log(onlineURL);

        firestore
          .collection("classes")
          .doc(currentClass)
          .collection("subjects")
          .doc(props.subject.id)
          .update({
            name: name,
            onlineURL: onlineURL,
          });
      } catch {}
    }

    return (
      <div key={props.subject.name.toLowerCase()}>
        {isEditable ? (
          <tr>
            <td>Priekšmets</td>
            <td>
              <input value={name} onChange={(e) => setName(e.target.value)} />
            </td>
            <td>Online stundu adrese</td>
            <input
              value={onlineURL}
              onChange={(e) => setOnlineURL(e.target.value)}
            />
            <button onClick={saveChanges}>Saglabāt</button>
          </tr>
        ) : (
          <tr>
            <td>Priekšmets</td>
            <td>
              <b>{props.subject.name}</b>
            </td>
            <td>Online stundu adrese</td>
            <td>
              <b>{props.subject.onlineURL ? props.subject.onlineURL : "--"}</b>
            </td>
            <td>
              <button onClick={() => setIsEditable(true)}>Rediģēt</button>
            </td>
          </tr>
        )}
      </div>
    );
  }

  function Subjects() {
    const subjectsList = subjects?.map((subject) => (
      <Subject subject={subject} key={subject.id} />
    ));

    return <>{subjectsList}</>;
  }
  function SelectedSettings() {
    switch (selected) {
      case "user":
        return (
          <div>
            <h4>Lietotāja uzstādījumi</h4>
          </div>
        );

      case "class":
        return (
          <div>
            <h4>Klases uzstādījumi</h4>
            <h5>ID nummurs</h5>
            <p>
              Pieslēgšanās kods skolēniem: <b>{props.classs}</b>
              <button
                onClick={() => navigator.clipboard.writeText(props.classs)}>
                Kopēt
              </button>
            </p>
            <h5>Mācību priekšmeti</h5>
            <Subjects />
            <CreateSubject />
          </div>
        );

      default:
        return <span />;
    }
  }

  function CreateSubject() {
    const [name, setName] = useState("");
    const [onlineURL, setOnlineURL] = useState("");
    function addSubject(e: any) {
      e.preventDefault();
      firestore
        .collection("classes")
        .doc(currentClass)
        .collection("subjects")
        .add({
          name: name,
          onlineURL: onlineURL,
        });
    }
    return (
      <Popup
        modal
        trigger={
          <button className="button">Pievienot mācību priekšmetu</button>
        }
        position="right center">
        {(close: any) => (
          <div style={{ color: "black" }}>
            <img
              src={Close}
              onClick={close}
              alt="close the modal"
              style={{ width: "35px" }}
            />
            <h2>Pievienot mācību priekšmetu</h2>
            <form onSubmit={addSubject}>
              <label>Priekšmeta nosaukums</label>
              <input value={name} onChange={(e) => setName(e.target.value)} />
              <label>Online stundu adrese (ja nav, atstāj tukšu)</label>
              <input
                value={onlineURL}
                onChange={(e) => setOnlineURL(e.target.value)}
              />
              <input type="submit" value="Pievienot" />
            </form>
          </div>
        )}
      </Popup>
    );
  }

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "row", gap: "1em" }}>
        <h2>Uzstādījumi</h2>
        <div
          style={{ background: "gray", cursor: "pointer" }}
          onClick={() => setSeleted("user")}>
          <h3>Lietotāja uzstādījumi</h3>
        </div>
        <div
          style={{ background: "gray", cursor: "pointer" }}
          onClick={() => setSeleted("class")}>
          <h3>Klases uzstādījumi</h3>
        </div>
      </div>

      <SelectedSettings />
    </div>
  );
}
