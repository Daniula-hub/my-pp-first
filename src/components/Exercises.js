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
      .post(`/api/cart/${exercise.exercise_id}`, {exercise})
      .then(() => console.log("Exercise added to cart!"))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h1>The Workouts</h1>
      {exercises.map((exercise) => {
        return (
          <div key={exercise.exercise_id}>
            <h4>{exercise.exercise_name}</h4>
            <p>{exercise.exercise_info}</p>
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

// import { setCart } from "../redux/cartReducer"; // en linea 4
// const dispatch = useDispatch(); // en linea 7

//  linea 17
//  const handleToCart = (exercise_id) => {
//     const exercise = cart.find((exercise) => exercise.exercise_id === exercise_id)
//     console.log(exercise)
//     if(!exercise){
//         axios.post(`/api/cart/${exercise_id}`)
//         .then(() => console.log ('success!'))
//         .catch((err) => console.log(err))
//     } else{
//         axios.put(`/api/cart/${exercise_id}`, {quantity: exercise.quantity + 1})
//         .then((res) => {
//             dispatch(setCart(res.data))  //give us updated cart
//         })
//         .catch(err => console.log(err))
//     }
//  }
