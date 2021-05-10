import { Route, Switch } from "react-router-dom";

//local importing
import Login from "./Login";
import SignUp from "./SignUp";
import Main from "./Main";


const App = () => {

  
  return (
    

    <div >
     
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/signUp" component={SignUp} />
        <Route exact path="/main" component={Main} />
      </Switch>
    </div>
  );
};

export default App;
