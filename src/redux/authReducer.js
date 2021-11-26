// initial state
const initialState = {
    user: null
}

// action types
const SET_USER = 'SET_USER'

// action builders
export function setUser (user){
    return {
        type: SET_USER,
        payload: user
    }
}

// const GET_USER = 'GET_USER';

// export function getUser(){
//     return {
//         type: GET_USER
//     }
// }

// reducer
export default function authReducer(state = initialState, action){
    switch (action.type){
        case SET_USER:
            return {...state, user: action.payload}
        // case GET_USER:
        //     return {
        //         ...state
        //     }
        default:
            return {...state}
    }
}
