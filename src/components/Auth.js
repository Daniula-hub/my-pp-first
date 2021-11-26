import React from "react";
import axios from "axios";
import { useState } from "react";
import { setUser } from "../redux/authReducer";
import { setCart } from "../redux/cartReducer";
import { connect } from "react-redux";
import Home from "./Home";


const Auth = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const { cart } = useSelector((store) => store.cartReducer);
  // const [loggedUser, setLoggedUser] = useState(undefined);

  const handleRegister = () => {
    axios
      .post("/auth/register", { email, password })
      .then((res) => {
        props.setUser(res.data.user);
        props.history.push("/home");
        props.setCart(res.data.cart);
        // setLoggedUser({...res.data})
      })
      .catch((err) => console.log(err));
  };
  const handleLogin = () => {
    axios
      .post("/auth/login", { email, password })
      .then((res) => {
        props.setUser(res.data.user);
        props.history.push("/exercises");
        props.setCart(res.data.cart);
        // setLoggedUser({...res.data})
      })
      .catch((err) => console.log(err));
  };
 
    return (
      <div>
        <h1>Hola</h1>
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
          <input value={password} onChange={(e) => setPassword(e.target.value)} />
          <button onClick={handleLogin}>Login</button>
          <button onClick={handleRegister}>Register</button>
        {/* {!loggedUser ? (
          <div>
          
          </div>
        ) : <Dash loggedUser={loggedUser} /> }  */}
      </div>
    );  
};

// export default Auth;
export default connect(null, { setUser })(Auth);
