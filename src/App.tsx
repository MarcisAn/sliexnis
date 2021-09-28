import PrivateRoute from "./components/PrivateRoute";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Dashboard from "./components/Dashboard";
import Landing from "./components/Landing";

function App() {
  return (
    <div>
      <Router>
        <AuthProvider>
          <PrivateRoute exact path="/" component={Dashboard} />
          <Route path="/landing" component={Landing} />
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
