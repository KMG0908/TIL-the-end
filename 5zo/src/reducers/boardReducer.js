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

    case FETCH_DAILY_LIST: {
      const board = action.payload;
      board.board_lists = JSON.parse(board.board_lists)
      return { ...state, [action.payload.board_id]: board };
    }

    case FETCH_TODO_LIST: {
      const board = action.payload;
      board.board_lists = JSON.parse(board.board_lists)
      return { ...state, [action.payload.board_id]: board };
    }

    case ADD_LIST: {
      const { board_id, cardlist_id } = action.payload[0];
      const board = state[board_id];
      const lists =  Array.isArray(board.board_lists)?board.board_lists:JSON.parse(board.board_lists);
      lists.push(cardlist_id)
      return {
        ...state, [board_id]: board
      };
    }

    case DELETE_LIST: {
      const { board } = action.payload;
       return { ...state, [board.board_id]: board };
    }

    default:
      return state;
  }
};
