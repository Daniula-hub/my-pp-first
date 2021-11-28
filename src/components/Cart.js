import { useEffect, useState } from "react";
import axios from "axios";
import "./Cart.css";
import { useSelector, useDispatch } from "react-redux";
import FutureWorkouts from "./FutureWorkouts";
import { setCart } from "../redux/cartReducer";
import CheckOut from './CheckOut';

const Cart = (props) => {
  const { cart } = useSelector((store) => store.cartReducer);
  const dispatch = useDispatch();
  const [futureExercises, setFutureExercises] = useState([]);

  useEffect(() => {
    axios
      .get("/api/cart")
      .then((res) => {
        dispatch(setCart(res.data));
      })
      .catch((err) => console.log(err));
  }, [dispatch]);

  const handleDeleteFromCart = (exercise_id) => {
    axios
      .delete(`/api/cart/${exercise_id}`)
      .then((res) => {
        dispatch(setCart(res.data));
      })
      .catch((err) => console.log(err));
  };

  const handleSaveForLater = (exercise) => {
    axios
      .post("/api/createFutureExercises", { exercise })
      .then((res) => {
        setFutureExercises(res.data);
      })
      .catch((err) =>
        console.log("There was an error creating a cart for Future Exercises: ", err)
      );
  };

  return (
    <div>
      <h1></h1>
      {cart.map((exercise) => {
        return (
            <div key={exercise.exercise_id}>
              <h4>{exercise.name}</h4>
              <button onClick={() => handleDeleteFromCart(exercise.exercise_id)}> Delete </button>
              <button onClick={() => handleSaveForLater(exercise)}>
                Save For Later
              </button>
              <img src={`${exercise.gifurl}`}/>
            </div>
        );
      })}
      <CheckOut exercise={cart}/>
      {futureExercises?.length > 0 ? <FutureWorkouts futureExercises={futureExercises} /> : null}
    </div>
  );
};

export default Cart;