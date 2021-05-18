import { USER_ADDED,USER_NOT_ADDED } from  '../actions/types'

const initialState = {
    user:null,
    loading:true,
    error:null
}

export default function(state = initialState, action){
    const {type , payload} = action;

    switch (type){
        case USER_ADDED:
            return{
                ...state,
                user:payload,
                loading:false
            };
        case USER_NOT_ADDED:
            return{
                ...state,
                loading: false,
                error:payload
            };
        default:
            return state;
    }

}
