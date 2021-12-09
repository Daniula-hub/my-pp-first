import React from "react";
import axios from "axios";
import "./Auth.css";
import { useState } from "react";
import { setUser } from "../redux/authReducer";
import { setCart } from "../redux/cartReducer";
import { connect } from "react-redux";


const Auth = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    axios
      .post("/auth/register", { email, password })
      .then((res) => {
        props.setUser(res.data.user);
        setCart(res.data.cart);
        props.history.push("/home");
      })
      .catch((err) => console.log(err));
  };
  const handleLogin = () => {
    axios
      .post("/auth/login", { email, password })
      .then((res) => {
        props.setUser(res.data.user);
        setCart(res.data.cart);
        props.history.push("/exercises");
      })
      .catch((err) => console.log(err));
  };
 
  return (
    <div >
        <img className='login-img' src="./img/db.jpeg"></img>
    <div className="container-fluid">    
      <div className="row">
      <div className="col-3"></div>
        <form className="col-6 auth-form">
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
          </div>
          <button type="submit" className="btn btn-primary" onClick={handleLogin}>Login</button>
          <button type="button" className="btn btn-light" id="right-button" onClick={handleRegister}>Register</button>
        </form>
      </div>
      <div className="col-3"></div>
    </div>
    </div>
  );
};

export default connect(null, { setUser })(Auth);
