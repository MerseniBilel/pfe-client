import {DASHBOARDCHARTS} from '../actions/types'

const initialState = {
    productivity: {},
    loading:true,
}

export default function(state = initialState, action){
    const {type, payload} = action;
    switch (type){
        case DASHBOARDCHARTS:
            return{
                ...state,
                productivity : payload,
                loading : false
            }
        default:
            return state
    }
}