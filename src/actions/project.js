import axios from 'axios';
import {PROJECTS_LOADED, PROJECTS_NOT_LOADED} from './types'
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
export const addProject = ({projectName, projectDesc, projectOwner,selectedValue}) => async dispatch => {
    //set auth token if exist if not so request will not be valid
    if(localStorage.token){
        setAuthToken(localStorage.token);
    }
    // create a team array with id property is  == to the id passed in selected value
    const team = selectedValue.map(v => {
        return{
            _id:v
        }
    });
    // create a config object 
    const config ={
        headers: {
            'content-type': 'application/json'
        }
    }
    // create the request body 
    const body = JSON.stringify({projectName,projectDesc, projectOwner, team});
    
    try {
        const res = await axios.post('/api/projs',body,config);
        if(res){
            dispatch(dashboardAlert('project Added Successfully','green'))
            dispatch(LoadProjects())
        }
       
    } catch (error) {
        dispatch(dashboardAlert('Bad request check the fields - reload the poge or cal the developer 😂 ','red'))
        console.log(error)
    }


}




//delete project
export const deleteProject = () => async dispatch => {

}




// update project
export const updateProject = ()  => async dispatch => {

}