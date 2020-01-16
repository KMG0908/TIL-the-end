import {FETCH_MEMBERS} from "../actions/types"
import _ from "lodash";


export default (state = {}, action) =>{
    switch (action.type){
        case FETCH_MEMBERS:
            return {...state, ..._.mapKeys(action.payload,"user_id")}
        default:
            return state
    }
}