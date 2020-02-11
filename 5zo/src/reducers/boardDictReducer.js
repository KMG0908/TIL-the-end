import { ADD_BOARD, FETCH_DAILY_LIST, FETCH_TODO_LIST} from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case ADD_BOARD:
      return { ...state, [action.payload.board_date]: action.payload.board_id };
    case FETCH_DAILY_LIST:
      return { ...state, [action.payload.board_date.split(" ")[0]]: action.payload.board_id };
    case FETCH_TODO_LIST:
      return { ...state, todo: action.payload.board_id };
    default:
      return state;
  }
};
