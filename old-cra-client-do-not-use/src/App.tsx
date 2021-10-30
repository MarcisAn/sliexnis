import PrivateRoute from "./components/PrivateRoute";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Landing from "./components/Landing";
import UserContainer from "./components/UserContainer";

function App() {
  return (
    <div>
      <Router>
        <AuthProvider>
          <PrivateRoute exact path="/" component={UserContainer} />
          <Route path="/landing" component={Landing} />
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
