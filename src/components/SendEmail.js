import axios from "axios";
import { useEffect } from "react";

const SendEmail = (props) =>{

     useEffect(() => {
          if (props.sendValidation) {
               axios.post('/sendEmail')
               .then(res => res.ok ? console.log('Email was sent') : null)
               .catch(err => console.log("There was an error sending the email to the user."))
          }else{
               console.log("Will not send email!");
          }
        }, []);

     return (
          <h1>Email was sent</h1>
     )
}

export default SendEmail;