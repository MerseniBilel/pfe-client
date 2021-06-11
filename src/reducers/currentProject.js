// get all projects
// get the login project owner projects 
import {CURRENTPROJECT_ERROR,CURRENTPROJECT_LOADED} from '../actions/types'

const initialState = {
    data : {},
    loading: true,
    error:null
}

export default function (state = initialState , action){
    const {type , payload} = action;

    switch (type){
        case CURRENTPROJECT_LOADED:
            return{
                ...state,
                data:payload,
                loading: false,
            }
        
        case CURRENTPROJECT_ERROR:
            return{
                ...state,
                error:payload,
            }
        
        default:
            return state;
    }
}