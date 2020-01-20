import {FETCH_CARDS}  from "../actions/types"
import _ from "lodash";


export default (state = {}, action) =>{
    switch (action.type){
        case FETCH_CARDS:
            return {...state, ..._.mapKeys(action.payload,"card_id")}
        default:
            return state
    }
}