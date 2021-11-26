import React from "react";
import axios from "axios";

class FutureWorkouts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: props.cart,
      futureWorkoutsList: [...props.cart],
    };
  }

  AddFutureWorkouts = () => {
    let cart = this.state.cart;
    this.setState({ futureWorkoutsList: cart });
  };

  render = () => {
    const { futureWorkoutsList } = this.state;
    return (
      <div>
        <nav className='futureworkouts-container'>
          <h1>Future Workouts</h1>
        {futureWorkoutsList.map((exercise) => {
          return (
            <div>
              <div key={exercise.exercise_id}>
                <h4>{exercise.exercise_name}</h4>
                <h5>Qty: {exercise.quantity}</h5>
              </div>
            </div>
          );
        })}
        </nav>
      </div>
    );
  };
}

export default FutureWorkouts;
