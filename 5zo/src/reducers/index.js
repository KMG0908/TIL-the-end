import { combineReducers } from "redux";
// import { reducer as formReducer } from "redux-form";
import memberReducer from "./memberReducer";
import boardReducer from "./boardReducer";
import cardListReducer from "./cardListReducer";
import cardReducer from "./cardReducer";

export default combineReducers({
  members: memberReducer,
  boards : boardReducer,
  cardlists : cardListReducer,
  cards : cardReducer
});
