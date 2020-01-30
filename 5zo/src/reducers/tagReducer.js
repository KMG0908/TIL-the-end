import { MEM_TAG } from 'actions/types'

export default (state = {}, action) => {
    switch(action.type){
        case MEM_TAG:
            return{...state, 'mem_tags' : action.payload}
        default:
            return state; 
    }
}