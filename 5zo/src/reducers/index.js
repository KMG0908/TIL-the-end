import { combineReducers } from "redux";
// import { reducer as formReducer } from "redux-form";
import MemberReducer from "./MemberReducer";

export default combineReducers({
  members: MemberReducer
});
