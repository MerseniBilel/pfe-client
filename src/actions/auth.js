import axios from "axios";
import {LOGIN_SUCCESS,LOGIN_FAIL,USER_LOADED,USER_LOADED_ERROR} from './types';
import {setAlert} from './alert';
import setAuthToken from '../utils/setAuthToken';




//Load user

export const loadUser = () => async dispatch => {
    if(localStorage.token){
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get('/api/auth');

        dispatch({
            type: USER_LOADED,
            payload:res.data 
        });

    } catch (error) {
        dispatch({
            type: USER_LOADED_ERROR
        });
    }
}




// Login
export const LoginUser = ({ email , password}) => async dispatch =>{
    const config ={
        headers: {
            'content-type': 'application/json'
        }
    }

    const body = JSON.stringify({email,password});

    try {
        const res = await axios.post('/api/auth',body,config);
        dispatch({
            type:LOGIN_SUCCESS,
            payload:res.data
        })

        dispatch(loadUser())


    } catch (error) {

        if(error){
            dispatch(setAlert('check your credentials','danger'));
        }

        dispatch({
            type:LOGIN_FAIL
        })
    }
}