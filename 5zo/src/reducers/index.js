import { combineReducers } from "redux";
// import { reducer as formReducer } from "redux-form";
import memberReducer from "./MemberReducer";
import boardReducer from "./BoardReducer";
import cardListReducer from "./CardListReducer";
import cardReducer from "./CardReducer";

export default combineReducers({
  members: memberReducer,
  boards : boardReducer,
  cardlists : cardListReducer,
  cards : cardReducer
});
