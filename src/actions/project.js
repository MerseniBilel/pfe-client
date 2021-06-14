import axios from 'axios';
import {PROJECTS_LOADED, CURRENTPROJECT_LOADED} from './types'
import setAuthToken from '../utils/setAuthToken';
import {dashboardAlert} from './dashboardAlert';


//LOAD ALL PROJECTS
export const LoadProjects = () => async dispatch => {
    if(localStorage.token){
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get('/api/projs');
        dispatch({
            type:PROJECTS_LOADED,
            payload:res.data
        })

    } catch (error) {
        dispatch(dashboardAlert('Bad reponse please reflesh the page and try again ','red'))
        console.log(error)

    }


}



// add project
export const addProject = (projectData) => async dispatch => {
    //set auth token if exist if not so request will not be valid
    if(localStorage.token){
        setAuthToken(localStorage.token);
    }
    
    // create a config object 
    const config ={
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }
    
    try {
        const res = await axios.post('/api/projs',projectData,config);
        if(res){
            dispatch(dashboardAlert('project Added Successfully','green'))
            dispatch(LoadProjects())
        }else{
            console.log('there is and error');
            //dispatch(dashboardAlert('Bad request check the fields - reload the poge or cal the developer 😂 ','red'))
        }
       
    } catch (error) {
        console.log(error)
    }


}



//get specific project 
export const getProjectById = (projectID) => async dispatch => {
    if(localStorage.token){
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get(`/api/projs/${projectID}`);
        
        dispatch({
            type:CURRENTPROJECT_LOADED,
            payload:res.data
        })
    } catch (error) {
        console.log(error)
    }
    

}


//delete project
export const deleteProject = ({projectid}) => async dispatch => {
    try{
        const res = await axios.delete(`/api/projs/${projectid}`);
        dispatch(LoadProjects())
    }catch(error){
        console.log(error);
    }
}


export const addtasktoevent = ({taskid, projectid}) => async dispatch => {
    try{
        console.log(taskid)
        console.log(projectid)
    }catch(error){
        console.log(error);
    }
}

