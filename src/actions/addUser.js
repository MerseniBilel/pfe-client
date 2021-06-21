import axios from "axios";
import {USER_ADDED,USER_NOT_ADDED} from './types';
import setAuthToken from '../utils/setAuthToken';
import {dashboardAlert} from './dashboardAlert';


//update user
export const updateUser = (datafile) => async dispatch => {
    if(localStorage.token){
        setAuthToken(localStorage.token);
    }
    const config ={
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }

    try {
        const res = await axios.put('/api/auth',datafile, config);
    } catch (error) {
        dispatch(dashboardAlert('there is an error','red'))
    }
}


//laod all user
export const LoadAllUsers = () => async dispatch => {
    if(localStorage.token){
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get('/api/user')
        dispatch({
            type:USER_ADDED,
            payload:res.data
        });

    } catch (error) {
        dispatch(dashboardAlert('Bad request please reflesh your page','red'))
        dispatch({
            type:USER_NOT_ADDED,
            payload:error.response.statusText
        })
    }
}


export const addUser = ({ name,lastname, email,password,phone_number,role,msg,logedinuser }) => async dispatch =>{
    const config ={
        headers: {
            'content-type': 'application/json'
        }
    }

    var taskdescription = `${new Date(Date.now()).toLocaleTimeString()} user ${email} added`;
    var theuser = logedinuser;
    const body2 = JSON.stringify({ taskdescription , theuser});
    await axios.post('/api/event',body2,config);

    const body = JSON.stringify({ name,lastname, email,password,phone_number,role,msg});
    
    try {
        const res = await axios.post('/api/user',body,config);
        if(res){
            dispatch(dashboardAlert('User Added Successfully','green'))
            dispatch(LoadAllUsers())
        }
       

    } catch (error) {

        
        dispatch(dashboardAlert('Bad request user alredy exist check the email field ','red'))
        /*if(error){
            dispatch(setAlert('check your credentials','danger'));
        }*/

        dispatch({
            type:USER_NOT_ADDED,
            payload:error.response.statusText
        })
    }

}