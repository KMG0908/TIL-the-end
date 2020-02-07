import { combineReducers } from "redux";
// import { reducer as formReducer } from "redux-form";
import memberReducer from "./memberReducer";
import boardReducer from "./boardReducer";
import cardListReducer from "./cardListReducer";
import cardReducer from "./cardReducer";
import boardDictReducer from "./boardDictReducer";
import statisticsReducer from "./statisticsReducer";
import searchReducer from "./searchReducer";
import tagReducer from "./tagReducer";
import heatmapReducer from "./heatmapReducer";
import calendarReducer from "./calendarReducer";
import calendarListReducer from "./calendarListReducer";
import editModeList from "./editModeList";
import editModeCard from "./editModeCard";

export default combineReducers({
  members: memberReducer,
  boards: boardReducer,
  cardLists: cardListReducer,
  cards: cardReducer,
  boardDict: boardDictReducer,
  statistics: statisticsReducer,
  search: searchReducer,
  tag: tagReducer,
  heatmaps: heatmapReducer,
  dailyCalendar: calendarReducer,
  listCalendar: calendarListReducer,
  editModeList: editModeList,
  editModeCard: editModeCard
});
