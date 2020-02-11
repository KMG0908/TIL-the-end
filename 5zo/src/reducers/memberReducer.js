import { FETCH_MEMBERS, LOGIN, LOGIN_ERR, REGISTER_ERR, REGISTER, REGISTER_RESET, SET_LOGGED_INFO, GET_LOGGED_INFO, LOGOUT, EDIT_MYINFO, EDIT_MYINFO_ERR, EDIT_MYINFO_CHANGE_RESET, GET_OTHER_MEMBER, DELETE_ACCOUNT, DELETE_ACCOUNT_ERR, DELETE_ACCOUNT_SUCCESS, FIND_ID_FAIL, FIND_ID_SUCCESS, FIND_PW_SUCCESS, FIND_PW_FAIL, EDIT_PASSWORD_SUCCESS, EDIT_PASSWORD_FAIL, EDIT_PASSWORD_SUCCESS_RESET, EDIT_PASSWORD_FAIL_RESET, EDIT_MY_COLOR_FAIL, EDIT_MY_COLOR_FAIL_RESET } from "../actions/types"
import _ from "lodash";
import { combineReducers } from "redux";


export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_MEMBERS:
      return { ...state, ..._.mapKeys(action.payload, "mem_id") }
    case LOGIN:
      return { ...state, "mem_info": action.payload }
    case LOGIN_ERR:
      return { ...state, "login_err": action.payload }
    case REGISTER:
      return { ...state, "register_id": action.payload }
    case REGISTER_ERR:
      return { ...state, "register_err": action.payload }
    case REGISTER_RESET:
      return { ...state, "register_err": "", "register_id": "" }
    case SET_LOGGED_INFO:
      return { ...state, "mem_info": action.payload }
    case GET_LOGGED_INFO:
      return state
    case LOGOUT:
      state = {}
      return combineReducers({ state: (state = {}) => state })
    // edit my info
    case EDIT_MYINFO:
      return { ...state, "mem_info_change": action.payload }
    case EDIT_MYINFO_ERR:
      return { ...state, "edit_myinfo_err": action.payload }
    case EDIT_MYINFO_CHANGE_RESET:
      return { ...state, "mem_info_change": undefined }
    // edit my color
    case EDIT_MY_COLOR_FAIL:
      return {...state, 'mem_color_change_fail' : '유저 색 변경 실패'}
      case EDIT_MY_COLOR_FAIL_RESET:
        return {...state, 'mem_color_change_fail' : undefined}
    // edit password
    case EDIT_PASSWORD_SUCCESS:
      return { ...state, "edit_password_success": true }
    case EDIT_PASSWORD_SUCCESS_RESET:
      return { ...state, "edit_password_success": undefined }
    case EDIT_PASSWORD_FAIL:
      return { ...state, "edit_password_fail": action.payload }
    case EDIT_PASSWORD_FAIL_RESET:
      return { ...state, "edit_password_fail": undefined }


    case GET_OTHER_MEMBER:
      return { ...state, "other_mem_info": action.payload }

    case DELETE_ACCOUNT:
      state = {}
      return combineReducers({ state: (state = {}) => state })
    case DELETE_ACCOUNT_ERR:
      return { ...state, "delete_account_err": action.payload }
    case DELETE_ACCOUNT_SUCCESS:
      return { ...state, 'delete_account_success': true }

    // find ID
    case FIND_ID_FAIL:
      return { ...state, 'find_id_fail': action.payload }
    case FIND_ID_SUCCESS:
      return { ...state, 'find_id_success': true }
    // find PW
    case FIND_PW_FAIL:
      return { ...state, 'find_pw_fail': action.payload }
    case FIND_PW_SUCCESS:
      return { ...state, 'find_pw_success': true }
    default:
      return state
  }
}