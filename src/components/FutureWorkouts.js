import axios from "axios";
import "./FutureWorkouts.css";
import { useState, useEffect } from "react";

const FutureWorkouts = (props) => {
    const [futureExercisesList, setFutureExercisesList] = useState([props.futureExercises]);

  useEffect(() => {
    const example = props.futureExercises.pop();
    if (example) {
      axios
      .get(`/api/futureExercises/${example.cart_id}`)
        .then((res) => {
          setFutureExercisesList(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  const handleDeleteFromCart = (exercise_id) => {
    axios
      .delete(`/api/cart/${exercise_id}`)
      .then((res) => {
        setFutureExercisesList(res.data);
      })
      .catch((err) => console.log(err));
  };

    return (
      <div>
        <nav className='futureworkouts-container'>
          <h1>Future Workouts</h1>
        {futureExercisesList.map((exercise) => {
          return (
            <div key={exercise.exercise_id}>
              <h4>{exercise.name}</h4>
              <button
                onClick={() => handleDeleteFromCart(exercise.exercise_id)}
              >
                Delete
              </button>
              <img src={`${exercise.gifurl}`} />
            </div>
          );
        })}
        </nav>
      </div>
    );
}

export default FutureWorkouts;