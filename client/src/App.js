import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import { Route, Switch } from "react-router-dom";
import Main from "./Components/Main";
import Chat from "./Components/Chat";

const App = () => {
  return (
    //"Don't have an account? Sign Up"

    <div>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/signUp" component={SignUp} />
        <Route exact path="/main" component={Main} />
        <Route exact path="/chat" component={Chat} />
      </Switch>
    </div>
  );
};

export default App;
