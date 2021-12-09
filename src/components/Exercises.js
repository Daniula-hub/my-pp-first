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

  <div className="container-fluid">
      <div className="row">
        <div>
        {exercises.map((exercise) => {
          return (
            <div className="card col-md-3">
              <img className="card-img-top" src={`${exercise.gifurl}`} alt={`${exercise.name}`}/>
              <div className="card-body">
                <h5 className="card-title">{exercise.name}</h5>
                <p className="card-text">Bodypart: {exercise.bodypart}</p>
                <p className="card-text">Muscle that targets: {exercise.target}</p>
                <small className="text-muted">Equipment: {exercise.equipment}</small>
              </div>
              <div className="card-footer">
                {props.user && (
                      <button className="btn-add" onClick={() => handleAddToCart(exercise)}>
                        <h4>Add Exercise</h4>
                      </button>
                )}              
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </div>
  return (
    <div className="container-fluid">
        <div className="row">
          {user ? <div ><h1 className="align-items-center" id="select">Start by selecting the exercises you want for your program.</h1></div>: null}
            {exercises.map((exercise) => {
              return (
                  <div className="card col-sm-6 col-md-6 align-items-center">
                    <img className="card-img-top" src={`${exercise.gifurl}`} alt={`${exercise.name}`} />
                    <div className="card-body">
                      <h4 className="card-title" id="cardName">{exercise.name}</h4>
                      <h5 className="card-text">Bodypart: {exercise.bodypart}</h5>
                      <h5 className="card-text">Muscle that targets: {exercise.target}</h5>
                      <h5 className="card-text"> Equipment: {exercise.equipment}</h5>
                    </div>
                    {props.user && (
                      <button className="btn-add" onClick={() => handleAddToCart(exercise)}>
                        <h4>Add Exercise</h4>
                      </button>
                    )}
                  </div>              
              );
            })}
        </div>
      </div>
  );
};

const mapStateToProps = (store) => store.auth;

export default connect(mapStateToProps)(Exercises);