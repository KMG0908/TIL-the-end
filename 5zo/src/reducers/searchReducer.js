import {SEARCH_KEYWORD } from 'actions/types'

export default (state = {}, action) => {
    switch(action.type){
        case SEARCH_KEYWORD:
            return{...state, 'cards' : action.payload}
        default:
            return state; 
    }
}