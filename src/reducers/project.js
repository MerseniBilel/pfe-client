// get all projects
// get the login project owner projects 
import {PROJECTS_LOADED,PROJECTS_NOT_LOADED} from '../actions/types'

const initialState = {
    data : {},
    loading: true,
    error:null
}

export default function (state = initialState , action){
    const {type , payload} = action;

    switch (type){
        case PROJECTS_LOADED:
            return{
                ...state,
                data:payload,
                loading: false,
            }
        
        case PROJECTS_NOT_LOADED:
            return{
                ...state,
                error:payload,
            }
        
        default:
            return state;
    }
}