import axios from 'axios';
import { useState } from 'react';
import {setUser} from '../redux/authReducer';
import {connect} from 'react-redux';


const Auth = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleRegister = () => {
        axios.post('/auth/register', { email, password})
        .then((res) => {
            console.log(res.data)
            props.setUser(res.data)
            props.history.push('/welcome')
        })
        .catch(err => console.log(err))
    }
    const handleLogin = () => {
        axios.post('/auth/login', {email, password})
        .then((res) => {
            console.log(res.data)
            props.setUser(res.data)
            props.history.push('/exercises')
        })
        .catch(err => console.log(err))
    }
    return(
        <div>
            <h1>Auth Page</h1>
            <input value={email} onChange={(e) => setEmail(e.target.value)} />
            <input value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleRegister}>Register</button>
        </div>
    )}

export default connect( null, {setUser})(Auth);