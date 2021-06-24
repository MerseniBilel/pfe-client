import axios from 'axios';
import { DATA_LOADED,DATA_NOT_LOADED, DASHBOARDCHARTS } from './types';
import setAuthToken from '../utils/setAuthToken';


//load admin dashboard Home page data 
export const loadAdminData = () => async dispatch =>{
    if(localStorage.token){
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get('/api/fetchadmin');
        dispatch({
            type:DATA_LOADED,
            payload:res.data
        })

    } catch (err) {
        dispatch({
            type:DATA_NOT_LOADED,
            payload:err.response.statusText
        })
    }
}

//load admin dashboard Home page data 
export const loadChartData = () => async dispatch =>{
    if(localStorage.token){
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get('/api/productivity');
        dispatch({
            type:DASHBOARDCHARTS,
            payload:res.data
        })

    } catch (err) {
        console.log(err);
    }
}