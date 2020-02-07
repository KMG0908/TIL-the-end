import { FETCH_MEMBERS, LOGIN, LOGIN_ERR, REGISTER_ERR, REGISTER, REGISTER_RESET, SET_LOGGED_INFO, GET_LOGGED_INFO, LOGOUT, EDIT_MYINFO, EDIT_MYINFO_ERR, EDIT_MYINFO_CHANGE_RESET, GET_OTHER_MEMBER, DELETE_ACCOUNT, DELETE_ACCOUNT_ERR, DELETE_ACCOUNT_SUCCESS } from "../actions/types"
import _ from "lodash";
import { combineReducers } from "redux";


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
    case EDIT_MYINFO:
      return {...state, "mem_info_change" : action.payload}
    case EDIT_MYINFO_ERR: 
      return {...state, "edit_myinfo_err" : action.payload}
    case EDIT_MYINFO_CHANGE_RESET:
      return { ...state, "mem_info_change" : undefined}
    case GET_OTHER_MEMBER:
      return {...state, "other_mem_info" : action.payload}

    case DELETE_ACCOUNT:
      state = {}      
      return combineReducers({state: (state = {}) => state})
    case DELETE_ACCOUNT_ERR :
      return {...state, "delete_account_err" : action.payload}
    case DELETE_ACCOUNT_SUCCESS:
      return {...state, 'delete_account_success' : true}
    default:
      return state
  }
}