import {LOGIN_FAIL,LOGIN_SUCCESS,USER_LOADED,USER_LOADED_ERROR} from '../actions/types'

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated:null,
    loading:true,
    user:null,
}

export default function(state = initialState, action){
    const {type, payload} = action;
    switch (type){
        case USER_LOADED:
            return{
                ...state,
                isAuthenticated:true,
                loading:false,
                user:payload
            }
        case LOGIN_SUCCESS:
            localStorage.setItem('token',payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated:true,
                loading:false
            }
        case LOGIN_FAIL:
        case USER_LOADED_ERROR:
            localStorage.removeItem('token');
            return{
                ...state,
                token:null,
                isAuthenticated:false,
                loading:false
            }
        default:
            return state;
    }
}