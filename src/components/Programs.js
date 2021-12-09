import React from 'react';
import { useState } from "react";
import FutureWorkouts from './FutureWorkouts';
import "./Programs.css";
import SendEmail from './SendEmail';

const Programs = (props) => {
    const [sendEmail, setSendEmail] = useState(false);

     const handleCheckOut = (program_name, price) => {
          fetch('http://localhost:3000/api/executePayment', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  program_name: program_name,
                  price: price
              })
          })
          .then(res => {
              if(res.ok) return res.json()
              return res.json().then(json => Promise.reject(json));
          })
          .then(({url}) => {
            {             
                window.location = url;
            }
            setSendEmail(true);
          })
          .catch(err => {
              console.log("Imprimiendo error de Stripe", err);
          })
     }

     return (
        <div className='programs container-fluid'>
           
            <div className="row">
                <div className="col-2"></div>
                <div className="col-8">
                <h2  className="intro-program" id="program">Each program will be adjusted to create a routine with the exercises that you choose. 
                        In this way you can help create your own routines.
                        We will add our professional coaches so you will never have a repetitive and boring workout. 
                        We offer the following programs:</h2>
                </div>
                <div className="col-2"></div>
            </div>
            <div className="row">
                <div className="col-3"></div>                 
                <div className="col-6">                 
                    <h1 className="intro-title-warrior" id="title-warrior">The Warrior</h1>
                    <h5  className="intro-warrior" id="warrior">This program is designed to teach you how to be healthy and reach your goals in a sustainable way.
                        Includes:
                        *How to train effectively to achieve results and never plateau.
                        *Video Descriptions and Tutorials of Movements.
                        *You’ll rely on simple equipment that will enable you to feel confident around the gym or at home.
                    </h5>
                    <h2>$10/month</h2>
                    <button className="btn-check1" onClick={() => handleCheckOut('The Warrior', 1000)}>Check Out</button>
                </div>
                <div className="col-3"></div>
            </div>

            <div className="row">
                <div className="col-6"></div> 
                    <div className="col-4">
                        <h1  className="intro-title-survivor" id="title-survivor">The Survivor</h1>
                        <h5 className="intro-survivor" id="survivor"> In this program you will have a Nutrition Guide / Meal Plan with the option of swap outs to help you eat a variety of healthy foods that will help you regain your energy levels, nourish your body, recover between workouts, build glowing healthy skin, and of course - build the muscles we are all after!
                            Includes:
                            *What foods to eat to achieve your goals while improving your health and overall body composition.
                            *Delicious Recipes with your pick of Plant-Based (Vegan) or Carnivore Options) with recipes.
                            *Portion control and timing of meals for individuals who choose to train in the morning and or/ evening. 
                        </h5>
                        <h2>$20/month</h2>
                        <button className="btn-check1" onClick={() => handleCheckOut('The Survivor', 2000)}>Check Out</button>
                    </div>
                    <div className="col-4"></div>
            </div>

            <div className="row">
                <div className="col-2"></div> 
                <div className="col-4">
                    <h1  className="intro-title-elevate" id="title-elevate">Elevate</h1>
                    <h5  className="intro-elevate" id="elevate">This current program focuses on building and maintaining lean muscle mass while decreasing body fat to achieve not only your aesthetics goals, but a healthy body and mind.
                        Includes:
                        *Personalized Nutritional Plan.
                        *Full follow along workout with our coaches 2 times a week.
                        *Stretching tutorials to help you perform movement properly.
                        *Private Facebook Group with The Workout App Community. 
                    </h5>
                    <h2>$30/month</h2>
                    <button className="btn-check1" onClick={() => handleCheckOut('Elevate', 3000)} >Check Out</button>
                </div>
                <div className="col-4"></div>     
            </div>
            {sendEmail ? <SendEmail sendValidation={sendEmail}/> : null }
        </div>
    )
}

export default Programs;