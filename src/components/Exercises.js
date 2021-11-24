import {useState, useEffect} from 'react';
import axios from 'axios'
import { connect } from 'react-redux'


const Exercises = (props) => {
    const [exercises, setExercises] = useState([])

    useEffect(() => {
        axios.get('/api/exercises')
        .then((res) => {
            setExercises(res.data)
        })
        .catch(err => console.log(err))
    }, [])

    const handleAddToCart = (exercise_id) =>  {
        axios.post(`/api/cart/${exercise_id}`)
        .then(() => console.log('Success!'))
        .catch((err) => console.log(err))
    }

    return(
        <div>
            <h1>The Workouts</h1>
            {exercises.map((exercise) => {
                return (
                    <div key={exercise.exercise_id}>
                        <h4>{exercise.exercise_name}</h4>
                        <p>{exercise.exercise_info}</p>
                        {props.user && <button onClick={() => handleAddToCart(exercise.exercise_id)}>Add To Cart</button>}
                    </div>
                )
            })}
            </div>
        )
    }

const mapStateToProps = (store) => store.auth


export default connect(mapStateToProps)(Exercises)