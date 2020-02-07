import { MEM_TAG, GET_ALL_TAG, FETCH_TAG } from 'actions/types'

export default (state = {}, action) => {
    switch(action.type){
        case MEM_TAG:
            return{...state, 'mem_tags' : action.payload}
        case GET_ALL_TAG:
            return{...state, 'tags' : action.payload}
        case FETCH_TAG:
          return{...state, [action.payload.cardlist_id]: action.payload.tags}
        default:
            return state; 
    }
}