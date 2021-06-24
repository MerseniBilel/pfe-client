import axios from "axios";
import {TEAMMEMBER_CHARTS, CLEARTEAMMEMBER_CHARTS} from './types';
import setAuthToken from '../utils/setAuthToken';
import {dashboardAlert} from './dashboardAlert';


//Load events
export const getTeamMemberProductivity = (userid) => async dispatch => {
    if(localStorage.token){
        setAuthToken(localStorage.token);
    }

    try {
        const response = await axios.get(`/api/productivity/teammember/${userid}`)
        console.log(response);
        dispatch({
            type: TEAMMEMBER_CHARTS,
            payload:response.data 
        });
    } catch (error) {
        console.log(error);
    }
}


export const generatePdfFile = () => async dispatch => {
    if(localStorage.token){
        setAuthToken(localStorage.token);
    }
    try {
        const response = await axios.get('/api/productivity/generate');
        dispatch(dashboardAlert('File Generated ','green'));
    } catch (error) {
        console.log(error)
    }
    

   
}




