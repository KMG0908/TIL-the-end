import { FETCH_LIST, ADD_LIST, ADD_CARD, DELETE_LIST, EDIT_LIST } from "../actions/types";
import _ from "lodash";

export default (state = {}, action) => {
  switch (action.type) {
    case ADD_CARD:
      const cardlist = state[action.payload.list_id]
      return {...state} //Todo : 뭐들어갈지 해보자
    case ADD_LIST:
      return { ...state, [action.payload.data.cardlist_id]: action.payload.data };
    case FETCH_LIST:
      return { ...state, ..._.mapKeys(action.payload, "cardlist_id") };
    case EDIT_LIST:
      return { ...state, [action.payload.cardlist_id]: action.payload };
    case DELETE_LIST:
      return _.omit(state, action.payload);

    default:
      return state;
  }
};
