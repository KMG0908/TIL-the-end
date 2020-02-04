import { GET_DAILY_CAL } from 'actions/types'

export default (state = {}, action) => {
    switch(action.type){
        case GET_DAILY_CAL:
            const board_lists = []
            return{...state, board_lists, 'info' : action.payload}
        default:
            return state; 
    }
}