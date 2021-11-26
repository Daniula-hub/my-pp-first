import { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import FutureWorkouts from "./FutureWorkouts";
import { setCart } from "../redux/cartReducer";

const Cart = (props) => {
  const { cart } = useSelector((store) => store.cartReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("/api/cart")
      .then((res) => {
        console.log('cart', res.data);
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

  const handleSaveForLater = async (exercise) => {
    let additionalExercise = undefined;
    
    axios
      .put(`/api/cart/createFutureExercises/${exercise.exercise_id}`)
      .then((res) => {
        additionalExercise = res.data;
      })
      .catch((err) =>
        console.log(
          "There was an error creating a cart for Future Exercises: ", err)
      );
    return additionalExercise ? additionalExercise : null;
  };

  return (
    <div>
      <h1>Cart Page</h1>
      {cart.map((exercise) => {
        return (
            <div key={exercise.exercise_id}>
              <h4>{exercise.exercise_name}</h4>
              <h5>Qty: {exercise.quantity}</h5>
              <button
                onClick={() => handleDeleteFromCart(exercise.exercise_id)}
              >
                Delete
              </button>
              <button onClick={() => handleSaveForLater(exercise)}>
                Save For Later
              </button>
            </div>
        );
      })}
      <FutureWorkouts cart={cart} />
    </div>
  );
};

export default Cart;
