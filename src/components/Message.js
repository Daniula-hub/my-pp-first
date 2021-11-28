import React from 'react';
import "./Message.css";

const Message = (props) => {
    return (
         <div>
              {props.show ? (
                   <p>Successful Payment!</p>
              ) : <p>Unsuccessful payment!</p>}


         </div>
    )
}

export default Message;