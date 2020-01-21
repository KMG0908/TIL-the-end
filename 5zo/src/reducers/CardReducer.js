import {
  FETCH_CARDS,
  ADD_CARD,
  DELETE_CARD,
  EDIT_CARD
} from "../actions/types";
import _ from "lodash";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_CARDS:
      return { ...state, ..._.mapKeys(action.payload, "card_id") };

    case ADD_CARD:
      return {...state,[action.payload.data.card_id]:action.payload.data}

    case DELETE_CARD:
      return _.omit(state, action.payload.card_id)
    
    case EDIT_CARD:
      return {...state, [action.payload.card_id]: action.payload }

    default:
      return state;
  }
};
