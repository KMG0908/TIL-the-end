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
      const board =action.payload;
    board.board_lists = JSON.parse(board.board_lists)
    console.log(board)
      return { ...state, [action.payload.board_id]: board };
    }

    case FETCH_TODO_LIST: {
      const board = action.payload;
      return { ...state, [action.payload.board_id]: board };
    }

    case ADD_LIST: {
      const { board_id, cardlist_id } = action.payload[0];
      const board = state[board_id];
      console.log(board.board_lists);
      const lists = JSON.parse(board.board_lists);
      lists.push(cardlist_id);
      console.log(JSON.stringify(lists))

      return {
        ...state,
        [board_id]: { ...board, board_lists: JSON.stringify(lists) }
      };
    }

    case DELETE_LIST: {
      const { list_id, board_id } = action.payload;
      const board = state[board_id];
      board.lists = board.lists.filter(id => id !== list_id);
      return { ...state, [board_id]: board };
    }

    default:
      return state;
  }
};
