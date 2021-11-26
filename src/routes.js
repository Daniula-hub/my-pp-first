import { Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Auth from "./components/Auth";
import Cart from "./components/Cart";
import Exercises from "./components/Exercises";

export default (
  <Switch>
    <Route exact path="/home" component={Home} />
    <Route path="/auth" component={Auth} />
    <Route path="/exercises" component={Exercises} />
    <Route path="/cart" component={Cart} />
  </Switch>
);
