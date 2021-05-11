import {
    DATA_LOADED,
    DATA_NOT_LOADED
} from '../actions/types';

const initialState = {
    data:null,
    loading:true,
    error:null
}

export default function (state = initialState, action){
    const {type, payload} = action;
    switch (type){
        case DATA_LOADED:
            return {
                ...state,
                data:payload,
                loading:false
            }
        case DATA_NOT_LOADED:
            return{
                ...state,
                error:payload
            }
        default:
            return state;
    }
}