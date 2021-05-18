import { REMOVE_DASHBOARD_ALERT, SET_DASHBOARD_ALERT } from '../actions/types'

const initialState = [];

export default function(state = initialState, action){
    const {type,payload} = action;
    switch (type){
        case SET_DASHBOARD_ALERT:
            return[...state,payload];
        case REMOVE_DASHBOARD_ALERT:
            return state.filter(alert => alert.id !== payload);
        default:
            return state;
    }
}