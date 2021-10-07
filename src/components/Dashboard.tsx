import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Calendar from "./dashboard/Calendar";
import Overview from "./dashboard/Overview";
import Settings from "./dashboard/Settings";
import Template from "./Template";

export default function Dashboard(props: any) {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Template>
            <Overview classs={props.class} />
          </Template>
        </Route>
        <Route path="/calendar">
          <Template>
            <Calendar />
          </Template>
        </Route>
        <Route path="/settings">
          <Template>
            <Settings classs={props.class} />
          </Template>
        </Route>
      </Switch>
    </Router>
  );
}
