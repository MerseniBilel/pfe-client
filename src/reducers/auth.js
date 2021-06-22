import {LOGIN_FAIL,LOGIN_SUCCESS,USER_LOADED,USER_LOADED_ERROR, LOGOUT} from '../actions/types'

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated:null,
    loading:true,
    user:{},
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
            return{
                ...state,
                token:null,
                isAuthenticated:false,
                loading:false
            }
        case LOGOUT:
            return {
                ...state,
                isAuthenticated:false,
                loading : false,
                token: null,
                user:{},
            }
        default:
            return state;
    }
}