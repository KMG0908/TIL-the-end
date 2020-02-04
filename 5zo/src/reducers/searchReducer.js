import {SEARCH_KEYWORD , SEARCH_CL_BY_TAGS} from 'actions/types'

export default (state = {}, action) => {
    switch(action.type){
        case SEARCH_KEYWORD:
            return{...state, 'cards' : action.payload}
        case SEARCH_CL_BY_TAGS:
            return{...state, 'cards' : action.payload}
        default:
            return state; 
    }
}