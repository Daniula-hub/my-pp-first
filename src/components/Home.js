import React from 'react';
import "./Home.css";

const Home = () => {
  return (
    <div className='intro'>
      <video src='./videos/wrk.mp4' autoPlay loop muted />
      <h1>Welcome to the Workout App</h1>

      <p>Whether you’re an absolute beginner, intermediate, or advanced, The Workout App makes it simple to get in shape and stay in shape. Get results-focused knowledge on weight loss, strength, nutrition, and more.
        
        We believe that fitness is foundational. A means to achieve what we want out of life. A lifelong journey that’s much more manageable, enjoyable and sustainable with an experienced guide along for the ride.
        We believe that real change, lasting change is achieved through a series of small daily choices that stack up to lifelong habits. And that it’s much easier to make those choices with a partner by your side.
        We believe fitness is for everyone. For every body. For life. </p>
      
      <h2>What are you waiting for?</h2>
      {/* <div className='intro-btns'>
        <Homebutton
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
          >
            GET STARTED
        </Homebutton>

      </div> */}

    </div>
  );
};

export default Home;
