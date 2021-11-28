import axios from "axios";
import "./CheckOut.css";
import Message from "./Message";
import { useState } from "react";

const CheckOut = (props) => {
     const [showValidation, setShowValidation] = useState(false);
     const handleCheckOut = (exercises, price) => {
          // const items = JSON.stringify(exercises)
          axios.post('/api/executePayment', {exercises, price})
          .then(({url}) => {
               setShowValidation(true);
               window.location(url);
               // props.history.push("/success");
          })
          .catch(err => {
               // props.history.push("/unsuccessful");
          })
     }

     return (
          <div>
               <h1>Plan #1</h1>
               <p>Description</p>
               <button onClick={() => handleCheckOut(props.exercise, 10)}>Check Out</button>
               <h1>Plan #2</h1>
               <p>Description</p>
               <button onClick={() => handleCheckOut(props.exercise, 20)}>Check Out</button>
               <h1>Plan #3</h1>
               <p>Description</p>
               <button onClick={() => handleCheckOut(props.exercise, 30)}>Check Out</button>
               {showValidation ? <Message show={true}/> : null}
          </div>
     )
};

export default CheckOut;