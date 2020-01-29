import { combineReducers } from "redux";
// import { reducer as formReducer } from "redux-form";
import memberReducer from "./memberReducer";
import boardReducer from "./boardReducer";
import cardListReducer from "./cardListReducer";
import cardReducer from "./cardReducer";
import boardDictReducer from "./boardDictReducer"
import statisticsReducer from "./statisticsReducer"
import searchReducer from "./searchReducer";

export default combineReducers({
  members: memberReducer,
  boards : boardReducer,
  cardLists : cardListReducer,
  cards : cardReducer,
  boardDict : boardDictReducer,
  statistics : statisticsReducer,
  search : searchReducer
});
