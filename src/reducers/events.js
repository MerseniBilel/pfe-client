import {EVENTS_LOADED, EVENTS_ERROR} from '../actions/types'

const initialState = {
    events: {},
    loading:true,
}

export default function(state = initialState, action){
    const {type, payload} = action;
    switch (type){
        case EVENTS_LOADED:
            return  {
                ...state,
                events : payload,
                loading : false,
            }
        case EVENTS_ERROR:
            return  {
                ...state,
                loading : false,
                events: {},
            }
        default:
            return state
    }
}