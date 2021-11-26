import { Switch, Route } from "react-router-dom";
import Dash from "./components/Dash";
import Auth from "./components/Auth";
import Cart from "./components/Cart";
import Welcome from "./components/Welcome";
import Exercises from "./components/Exercises";

export default (
  <Switch>
    <Route exact path="/" component={Dash} />
    <Route path="/auth" component={Auth} />
    <Route path="/welcome" component={Welcome} />
    <Route path="/exercises" component={Exercises} />
    <Route path="/cart" component={Cart} />
  </Switch>
);
