import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import { Route, Switch } from "react-router-dom";
import Main from "./Components/Main";

const App = () => {
  return (
    //"Don't have an account? Sign Up"

    <div>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/signUp" component={SignUp} />
        <Route exact path="/main" component={Main} />
      </Switch>
    </div>
  );
};

export default App;
