import {
  ADD_BOARD,
  ADD_LIST,
  DELETE_LIST,
  FETCH_DAILY_LIST,
  FETCH_TODO_LIST
} from "../actions/types";
import _ from "lodash";

export default (state = {}, action) => {
  switch (action.type) {
    case ADD_BOARD:
      return { ...state, ..._.mapKeys(action.payload, "board_id") };
    case FETCH_DAILY_LIST:
      return { ...state, ..._.mapKeys(action.payload, "board_id") };
    case FETCH_TODO_LIST:
      return { ...state, ..._.mapKeys(action.payload, "board_id") };

    case ADD_LIST:{
      const { board_id, data } = action.payload;
      const board = state[board_id];
      board.cardlists.push(data.cardlist_id);
      return { ...state, [board_id]: board };}

    case DELETE_LIST:{
      const { list_id, board_id } = action.payload;
      const board = state[board_id];
      board.lists = board.lists.filter(id => id !== list_id)
      return { ...state, [board_id] : board };}

    default:
      return state;
  }
};
