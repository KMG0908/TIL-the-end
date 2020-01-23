import {
  FETCH_LIST,
  ADD_LIST,
  ADD_CARD,
  DELETE_CARD,
  DELETE_LIST,
  EDIT_LIST
} from "../actions/types";
import _ from "lodash";

export default (state = {}, action) => {
  switch (action.type) {
    case ADD_CARD: {
      const { cardlist_id, data } = action.payload;
      const cardlist = state[cardlist_id];
      cardlist.cards.push(data.card_id);
      return { ...state, [cardlist_id]: cardlist };
    }

    case DELETE_CARD: {
      const { list_id, card_id } = action.payload;
      const cardlist = state[list_id];
      cardlist.cards = cardlist.cards.filter(id => id!==card_id)
      return {...state, [list_id]: cardlist}

    }

    case ADD_LIST:
      return {
        ...state,
        [action.payload.data.cardlist_id]: action.payload.data
      };
    case FETCH_LIST:
      return { ...state, ..._.mapKeys(action.payload, "cardlist_id") };
    case EDIT_LIST:
      return { ...state, [action.payload.cardlist_id]: action.payload };
    case DELETE_LIST:
      return _.omit(state, action.payload.cardlist_id);

    default:
      return state;
  }
};
