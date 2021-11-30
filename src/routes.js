import { Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Auth from "./components/Auth";
import Exercises from "./components/Exercises";
import Programs from "./components/Programs";
import YourChosenExercises from "./components/YourChosenExercises";

export default (
  <Switch>
    <Route exact path="/home" component={Home} />
    <Route path="/auth" component={Auth} />
    <Route path="/exercises" component={Exercises} />
    <Route path="/programs" component={Programs} />
    <Route path="/yourExercises" component={YourChosenExercises} />
  </Switch>
);
