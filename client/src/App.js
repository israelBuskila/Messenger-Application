import Login from "./Component/Login";
import SignUp from "./Component/SignUp";
import { Route, Switch } from "react-router-dom";

const App = () => {
  return (
    //"Don't have an account? Sign Up"

    <div>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/signUp" component={SignUp} />
      </Switch>
    </div>
  );
};

export default App;
