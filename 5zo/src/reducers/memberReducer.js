import {FETCH_MEMBERS, LOGIN_MEMBER} from "../actions/types"
import _ from "lodash";


export default (state = {}, action) =>{
    switch (action.type){
        case FETCH_MEMBERS:
            return {...state, ..._.mapKeys(action.payload,"mem_id")}
        
        case LOGIN_MEMBER:
            return {...state, "login_user" : action.payload};   // 변수명 적절한게 생각이 나지 않음. 

        default:
            return state
    }
}