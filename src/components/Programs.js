import React from 'react';
import axios from "axios";
import "./Programs.css";
import Message from "./Message";
import { useState } from "react";

const Programs = (props) => {
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
        
    <div className='programs'>
        <h1>Each program will be adjusted to create a routine with the exercises that you choose. 
            In this way you can help create your own routines.
            We will add our professional coaches so you will never have a repetitive and boring workout. 
            We offer the following programs:</h1>
        <h1>The Warrior</h1>
        <p>This program is designed to teach you how to be healthy and reach your goals in a sustainable way.
            Includes:
            How to train effectively to achieve results and never plateau.
            Video Descriptions and Tutorials of Movements.
            You’ll rely on simple equipment that will enable you to feel confident around the gym or at home.
        </p>
        <h2>$10/month</h2>
        <button onClick={() => handleCheckOut(props.exercise, 10)}>Check Out</button>
        <h1>The Survivor</h1>
        <p> In this program you will have a Nutrition Guide / Meal Plan with the option of swap outs to help you eat a variety of healthy foods that will help you regain your energy levels, nourish your body, recover between workouts, build glowing healthy skin, and of course - build the muscles we are all after!
            Includes:
            What foods to eat to achieve your goals while improving your health and overall body composition.
            Delicious Recipes with your pick of Plant-Based (Vegan) or Carnivore Options) with recipes.
            Portion control and timing of meals for individuals who choose to train in the morning and or/ evening. 
        </p>
        <h2>$20/month</h2>
        <button onClick={() => handleCheckOut(props.exercise, 20)}>Check Out</button>
        <h1>Elevate</h1>
        <p>This current program focuses on building and maintaining lean muscle mass while decreasing body fat to achieve not only your aesthetics goals, but a healthy body and mind.
             Includes:
             Personalized Nutritional Plan.
             Full follow along workout with our coaches 2 times a week.
             Stretching tutorials to help you perform movement properly.
             Private Facebook Group with The Workout App Community. 
        </p>
        <h2>$30/month</h2>
        <button onClick={() => handleCheckOut(props.exercise, 30)}>Check Out</button>
        {showValidation ? <Message show={true}/> : null}
         </div>
    )
}

export default Programs;