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
export const addProject = (projectData, projectOwner) => async dispatch => {
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
        var taskdescription = 'project added';
        var theuser = projectOwner;
        const body = JSON.stringify({ taskdescription , theuser});
        await axios.post('/api/event',body,config2);

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
export const deleteProject = ({projectid, projectownerid}) => async dispatch => {
    const config2 ={
        headers: {
            'content-type': 'application/json'
        }
    }
    try{

        var taskdescription = 'project deleted';
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
    try{
        console.log(taskid)
        //send put request to project to change task complete to true

        console.log(projectid)
        //send post request to task to add the finish date
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



