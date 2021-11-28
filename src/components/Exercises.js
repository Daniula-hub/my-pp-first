import { useState, useEffect } from "react";
import axios from "axios";
import "./Exercises.css";
import { useSelector } from "react-redux";
import { connect } from "react-redux";

const Exercises = (props) => {
  const [exercises, setExercises] = useState([]);
  const { user } = useSelector((store) => store.auth);

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
      {user ? <h1>Start by selecting the exercises you want for your program</h1> : null}
      {exercises.map((exercise) => {
        return (
          <div key={exercise.exercise_id}>
            <h2> {exercise.name}</h2>
            <h3>Bodypart: {exercise.bodypart}</h3>
            <h3>Muscle that targets: {exercise.target}</h3>
            <h3> Equipment: {exercise.equipment}</h3>
            <img className='gif-container' src={`${exercise.gifurl}`} />
          
            {props.user && (
              <button className="btn-add" onClick={() => handleAddToCart(exercise)}>
                <h4>Add Exercise</h4>
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