import { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";

const Exercises = (props) => {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    axios
      .get("/api/exercises")
      .then((res) => {
        setExercises(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleAddToCart = (exercise) => {
    axios
      .post(`/api/cart/${exercise.exercise_id}`)
      .then(() => console.log("Exercise added to cart!"))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h1>The Workouts</h1>
      {exercises.map((exercise) => {
        return (
          <div key={exercise.exercise_id}>
            <h4>{exercise.name}</h4>
            <h3>{exercise.bodypart}</h3>
            <h2>{exercise.target}</h2>
            <p>{exercise.equipment}</p>
            <img src={`${exercise.gifurl}`} />
            {props.user && (
              <button onClick={() => handleAddToCart(exercise)}>
                Add To Cart
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

const mapStateToProps = (store) => store.auth;

export default connect(mapStateToProps)(Exercises);