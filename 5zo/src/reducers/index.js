import { combineReducers } from "redux";
// import { reducer as formReducer } from "redux-form";
import memberReducer from "./MemberReducer";
import boardReducer from "./BoardReducer";
import cardListReducer from "./CardListReducer";
import cardReducer from "./CardReducer";
import boardDictReducer from "./boardDictReducer"
import statisticsReducer from "./statisticsReducer"

export default combineReducers({
  members: memberReducer,
  boards : boardReducer,
  cardLists : cardListReducer,
  cards : cardReducer,
  boardDict : boardDictReducer,
  statistics : statisticsReducer
});
