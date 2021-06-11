// it's like creating your own notion app ; 


import { TASKS_LOADED,TASKS_ERROR } from  '../actions/types'

const initialState = {
    tasks:[],
    loading:true,
    error:null
}

export default function(state = initialState, action){
    const {type , payload} = action;

    switch (type){
        case TASKS_LOADED:
            return{
                ...state,
                tasks:payload,
                loading:false
            };
        case TASKS_ERROR:
            return{
                ...state,
                loading: false,
                error:payload
            };
        default:
            return state;
    }

}