import { useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setCart } from '../redux/cartReducer'

const Cart = (props) => {
    const {cart} = useSelector((store) => store.cartReducer)
    const dispatch = useDispatch()
    
    useEffect(() => {
        axios.get('/api/cart')
        .then((res) => {
            console.log(res.data)
            dispatch(setCart(res.data))
        })
        .catch(err => console.log(err))
    }, [dispatch])

    const handleDeleteFromCart = (exercise_id) => {
        axios.delete(`/api/cart/${exercise_id}`)
        .then((res) => {
            dispatch(setCart(res.data))
        })
        .catch(err => console.log(err))
    }

    const handleSaveForLater = (exercise_id, exercise_name) => {
        axios.put(`/api/cart/${exercise_id}`, {exercise_name})
        .then((res) => {
            dispatch(setCart(res.data))
        })
        .catch(err => console.log(err))
    }


    return(
        <div>
            <h1>Cart Page</h1>
            {cart.map((exercise) => {
                return(
                    <div key={exercise.exercise_id}>
                     <h4>{exercise.exercise_name}</h4>    
                     <h5>Qty: {exercise.quantity}</h5>
                     <button onClick={() => handleDeleteFromCart(exercise.exercise_id)}>X</button>
                    <button onClick={() => handleSaveForLater(exercise.exercise_id, exercise.exercise_name)}>Save For Later</button>
                     </div>
                ) 
            })}
        </div>
    )
}

export default Cart;