import axios from "axios";
import {TASKS_LOADED,TASKS_ERROR} from './types';
import setAuthToken from '../utils/setAuthToken';
import {dashboardAlert} from './dashboardAlert';
import {loadChartData} from './adminHomePage'


//get project tasks 

export const getTasksByID = (projectID) => async dispatch => {
    if(localStorage.token){
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get(`/api/tasks/${projectID}`);
        dispatch({
            type:TASKS_LOADED,
            payload:res.data
        })
    } catch (error) {
        console.log(error.message)
    }
    
}


//add task

export const addtask = ({task,description,periority,deadline, projectId, projectOwner}) => async dispatch => {
    if(localStorage.token){
        setAuthToken(localStorage.token);
    }

    const config ={
        headers: {
            'content-type': 'application/json'
        }
    }
    const body = JSON.stringify({ task,description, periority,deadline,projectId,projectOwner});

    try {
        const chart = await axios.get('/api/productivity/pending');
        dispatch(loadChartData())
        const res = await axios.post('/api/tasks/',body, config);
        dispatch(getTasksByID(projectId));
        dispatch(dashboardAlert('Task added, drag it to the user ','green'));

        console.log(res);
    } catch (error) {
        console.log(error.message)
    }
    
}

//update tasks
export const updateTasks = (taskstable) => async dispatch => {
    if(localStorage.token){
        setAuthToken(localStorage.token);
    }

    const config ={
        headers: {
            'content-type': 'application/json'
        }
    }

    try {
        const res = await axios.put('/api/tasks', taskstable);
    } catch (error) {
        console.log(error);
    }

    console.log(taskstable);
    
}


