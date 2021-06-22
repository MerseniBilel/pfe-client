import axios from "axios";
import {EVENTS_LOADED, EVENTS_ERROR} from './types';
import setAuthToken from '../utils/setAuthToken';


//Load events
export const loadevent = (userid) => async dispatch => {
    if(localStorage.token){
        setAuthToken(localStorage.token);
    }

    try {
        console.log(userid);
        const response = await axios.get(`/api/event/${userid}`);
        dispatch({
            type: EVENTS_LOADED,
            payload:response.data 
        });
        console.log(response.data);
    } catch (error) {
        console.log(error)
    }
}

//generate log file
export const generatelogfile = () => async dispatch => {
    if(localStorage.token){
        setAuthToken(localStorage.token);
    }
}

