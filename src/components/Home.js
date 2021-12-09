import React from 'react';
import "./Home.css";

const Home = () => {
  return (
   <div>
        <section class="showcase">
          <video src="./videos/Intro.mp4" width="640" autoPlay loop muted></video>
        </section>
      <h1 className="intro-welcome" id="welcome">Welcome to The Workout App</h1>

      <h3 className="intro-info" id="info">Whether you’re an absolute beginner, intermediate, or advanced, The Workout App makes it simple to get in shape and stay in shape. Get results-focused knowledge on weight loss, strength, nutrition, and more.
        
        We believe that fitness is foundational. A means to achieve what we want out of life. A lifelong journey that’s much more manageable, enjoyable and sustainable with an experienced guide along for the ride.
        We believe that real change, lasting change is achieved through a series of small daily choices that stack up to lifelong habits. And that it’s much easier to make those choices with a partner by your side.
        We believe fitness is for everyone. For every body. For life. </h3>
      
      <h2 className="intro-question" id="question">What are you waiting for?</h2>
      </div>
  );
};

export default Home;
