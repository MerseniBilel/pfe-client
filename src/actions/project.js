import axios from 'axios';
import {PROJECTS_LOADED, PROJECTS_NOT_LOADED} from './types'
import setAuthToken from '../utils/setAuthToken';

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
        console.log(error)

    }


}



// add project





//delete project





// update project