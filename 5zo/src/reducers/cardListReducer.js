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
      const { cardlist_id, card_id } = action.payload;
      const cardlist = state[cardlist_id];
      const lists =  Array.isArray(cardlist.cardlist_cards)?cardlist.cardlist_cards:JSON.parse(cardlist.cardlist_cards)
      lists.push(card_id);
      cardlist.cardlist_cards = JSON.stringify(lists)
      return { ...state, [cardlist_id]: cardlist };
    }

    case DELETE_CARD: {
      const { list_id, card_id } = action.payload;
      const cardlist = state[list_id];
      cardlist.cards = cardlist.cards.filter(id => id !== card_id);
      return { ...state, [list_id]: cardlist };
    }

    case ADD_LIST:
      return { ...state, ..._.mapKeys(action.payload, "cardlist_id") };
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
