import { GET_DAILY_TASK } from 'actions/types'

export default (state = {}, action) => {
    switch(action.type){
        case GET_DAILY_TASK:
            return{...state, 'info' : action.payload}
        default:
            return state; 
    }
}