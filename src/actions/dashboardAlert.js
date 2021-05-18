import {REMOVE_DASHBOARD_ALERT, SET_DASHBOARD_ALERT } from './types';
import{v4 as uuid} from 'uuid';


export const dashboardAlert = (msg,alertType) => dispatch =>{
    const id = uuid();

    dispatch({
        type:SET_DASHBOARD_ALERT,
        payload:{msg,alertType,id}
    });

    setTimeout(() => dispatch({ type:REMOVE_DASHBOARD_ALERT, payload:id }), 5000)

}