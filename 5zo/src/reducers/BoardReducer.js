import { FETCH_DAILY_LIST, FETCH_TODO_LIST } from "../actions/types";
import _ from "lodash";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_DAILY_LIST:
      return { ...state, ..._.mapKeys(action.payload, "board_type") };
    case FETCH_TODO_LIST:
        console.log(_.mapKeys(action.payload,"board_type"))
      return { ...state, ..._.mapKeys(action.payload, "board_type") };
    default:
      return state;
  }
};
