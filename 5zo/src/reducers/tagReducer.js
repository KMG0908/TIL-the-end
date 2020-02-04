import { MEM_TAG, GET_ALL_TAG } from 'actions/types'

export default (state = {}, action) => {
    switch(action.type){
        case MEM_TAG:
            return{...state, 'mem_tags' : action.payload}
        case GET_ALL_TAG:
            return{...state, 'tags' : action.payload}
        default:
            return state; 
    }
}