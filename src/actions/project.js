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
export const addProject = (projectData, projectOwner, projectName) => async dispatch => {
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
    const config2 ={
        headers: {
            'content-type': 'application/json'
        }
    }
    
    try {
        var taskdescription = `${new Date(Date.now()).toLocaleTimeString()} project ${projectName} added`;
        var theuser = projectOwner;
        const body = JSON.stringify({ taskdescription , theuser});
        await axios.post('/api/event',body,config2);

        const res = await axios.post('/api/projs',projectData,config);
        if(res){
            dispatch(dashboardAlert('project Added Successfully','green'))
            dispatch(LoadProjects())

            

        }else{
            //console.log('there is and error');
            dispatch(dashboardAlert('project already exists','red'))
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
export const deleteProject = ({projectid, projectownerid}) => async dispatch => {
    const config2 ={
        headers: {
            'content-type': 'application/json'
        }
    }
    try{

        var taskdescription = `${new Date(Date.now()).toLocaleTimeString()} project with id ${projectid} deleted`;
        var theuser = projectownerid;
        const body = JSON.stringify({ taskdescription , theuser});
        await axios.post('/api/event',body,config2);

        const res = await axios.delete(`/api/projs/${projectid}`);
        dispatch(LoadProjects())
    }catch(error){
        console.log(error);
    }
}

//add finish task to event
export const addtasktoevent = ({taskid, projectid}) => async dispatch => {
    const config ={
        headers: {
            'content-type': 'application/json'
        }
    }
    try{
        //update task to conpleted when check box
        const res = await axios.put(`/api/projs/task/${taskid}`);

        // get the task id
        const task = await axios.get(`/api/tasks/task/${projectid}`)
        const result = task.data[0].tasks.filter(tt => tt._id == taskid);
        
        var taskdescription = result[0].description
        var finishdate = new Date(Date.now()).toLocaleDateString();
        const body = JSON.stringify({ taskdescription , finishdate});
        await axios.post('/api/event/update',body,config);
        dispatch(getProjectById(projectid))
    }catch(error){
        console.log(error);
    }
}


//init event 
export const initevnet = (myproject,currentuser) => async dispatch => {
    if(localStorage.token){
        setAuthToken(localStorage.token);
    }
    const config ={
        headers: {
            'content-type': 'application/json'
        }
    }
    try{
        const mytasks = myproject.tasks.filter(tt => tt.teamMember == currentuser._id);
        await Promise.all(mytasks.map(async ttt => {
            //const {taskdescription , theuser} = req.body
            //const body = JSON.stringify({ name,lastname, email,password,phone_number,role,msg});
            var taskdescription = ttt.description
            var theuser = currentuser._id
            const  body = JSON.stringify({ taskdescription , theuser});
            await axios.post('/api/event', body,config);

        }));

    }catch(error){
        console.log(error);
    }
}



//delete project
export const updateProject = ({projectid, projectownerid}) => async dispatch => {
    const config2 ={
        headers: {
            'content-type': 'application/json'
        }
    }
    try{

        var taskdescription = `${new Date(Date.now()).toLocaleTimeString()} project started ${projectid}`;
        var theuser = projectownerid;
        const body = JSON.stringify({ taskdescription , theuser});
        await axios.post('/api/event',body,config2);

        const res = await axios.put(`/api/projs/${projectid}`);
        dispatch(dashboardAlert('project Started','green'))
        dispatch(LoadProjects())
    }catch(error){
        console.log(error);
    }
}