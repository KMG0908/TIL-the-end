import { FETCH_MEMBERS, LOGIN, LOGIN_ERR, REGISTER_ERR, REGISTER, REGISTER_RESET, SET_LOGGED_INFO, GET_LOGGED_INFO, LOGOUT } from "../actions/types"
import _ from "lodash";
import { combineReducers } from "../../../../../../Users/multicampus/AppData/Local/Microsoft/TypeScript/3.6/node_modules/redux";


export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_MEMBERS:
      return { ...state, ..._.mapKeys(action.payload, "mem_id") }
    case LOGIN:
      return {...state, "mem_info" : action.payload}
    case LOGIN_ERR:
      return {...state, "login_err" : action.payload}
    case REGISTER:
      return {...state, "register_id": action.payload}
    case REGISTER_ERR:
      return {...state, "register_err" : action.payload}
    case REGISTER_RESET:
      return {...state, "register_err" : "", "register_id" : ""}
    case SET_LOGGED_INFO:
      return {...state, "mem_info" : action.payload}
    case GET_LOGGED_INFO:
      return state
    case LOGOUT:
      state = {}
      return combineReducers({state: (state = {}) => state})
    default:
      return state
  }
}