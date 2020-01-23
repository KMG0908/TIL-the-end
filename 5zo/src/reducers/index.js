import { combineReducers } from "redux";
// import { reducer as formReducer } from "redux-form";
import memberReducer from "./memberReducer";
import boardReducer from "./boardReducer";
import cardListReducer from "./cardListReducer";
import cardReducer from "./cardReducer";
import boardDictReducer from "./boardDictReducer"
import auth from "redux/modules/auth";
export default combineReducers({
  members: memberReducer,
  boards : boardReducer,
  cardLists : cardListReducer,
  cards : cardReducer,
  boardDict : boardDictReducer,
  auth
});
