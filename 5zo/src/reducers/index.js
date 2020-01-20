import { combineReducers } from "redux";
// import { reducer as formReducer } from "redux-form";
import MemberReducer from "./MemberReducer";
import BoardReducer from "./BoardReducer";
import CardListReducer from "./CardListReducer";
import CardReducer from "./CardReducer";

export default combineReducers({
  members: MemberReducer,
  boards : BoardReducer,
  CardLists : CardListReducer,
  Cards : CardReducer
});
