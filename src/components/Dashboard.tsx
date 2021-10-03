import LogOut from "./auth/LogOut";

export default function Dashboard(props: any) {
  return (
    <>
      {props.class}
      <LogOut />
      <h1>Dasboard</h1>
    </>
  );
}
