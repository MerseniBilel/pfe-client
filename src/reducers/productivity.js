import {TEAMMEMBER_CHARTS, CLEARTEAMMEMBER_CHARTS} from '../actions/types'

const initialState = {
    productivity: {},
    loading:true,
}

export default function(state = initialState, action){
    const {type, payload} = action;
    switch (type){
        case TEAMMEMBER_CHARTS:
            return{
                ...state,
                productivity : payload,
                loading : false
            }
        case CLEARTEAMMEMBER_CHARTS:
            return {
                ...state,
                productivity : {},
                loading : false
            }
        default:
            return state
    }
}