import { Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Auth from "./components/Auth";
import Exercises from "./components/Exercises";
import YourPicks from "./components/YourPicks";
import Programs from "./components/Programs";
import Cart from "./components/Cart";

export default (
  <Switch>
    <Route exact path="/home" component={Home} />
    <Route path="/auth" component={Auth} />
    <Route path="/exercises" component={Exercises} />
    <Route path="/yourpicks" component={YourPicks} />
    <Route path="/programs" component={Programs} />
    <Route path="/cart" component={Cart} />
  
  </Switch>
);
