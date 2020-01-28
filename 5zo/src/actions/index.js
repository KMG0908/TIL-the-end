import apis from "../apis/apis";
// import history from "../history";
import {
  FETCH_MEMBERS,
  DRAG_HAPPENED,
  ADD_BOARD,
  FETCH_DAILY_LIST,
  FETCH_TODO_LIST,
  FETCH_LIST,
  ADD_LIST,
  EDIT_LIST,
  DELETE_LIST,
  FETCH_CARDS,
  ADD_CARD,
  EDIT_CARD,
  DELETE_CARD
} from "./types";

export const fetchMembers = () => async dispatch => {
  const response = await apis.get("/member");
  await dispatch({ type: FETCH_MEMBERS, payload: response.data.data });
};

export const addBoard = (mem_id, board_date, board_type) => async dispatch => {
  const board_lists = "[]";
  const response = await apis.post("/board", {
    mem_id,
    board_date,
    board_type,
    board_lists
  });
  dispatch({ type: ADD_BOARD, payload: response.data.data });
};

export const fetchDailyLists = (mem_id, board_date) => async dispatch => {
  const response = await apis.get(`/board/member/${mem_id}/date/${board_date}`);
  dispatch({ type: FETCH_DAILY_LIST, payload: response.data.data[0] });

  JSON.parse(response.data.data[0].board_lists).map(async cardlist_id => {
    let cardlist = await apis.get(`/cardlist/${cardlist_id}`);
    dispatch({ type: FETCH_LIST, payload: [cardlist.data.data] });
    JSON.parse(cardlist.data.data.cardlist_cards).map(async card_id => {
      let card = await apis.get(`/card/${card_id}`);
      dispatch({ type: FETCH_CARDS, payload: [card.data.data] });
    });
  });
};

export const fetchTodoLists = mem_id => async dispatch => {
  const response = await apis.get(`/board/member/${mem_id}`);
  dispatch({ type: FETCH_TODO_LIST, payload: response.data.data[0] });

  JSON.parse(response.data.data[0].board_lists).map(async cardlist_id => {
    let cardlist = await apis.get(`/cardlist/${cardlist_id}`);
    dispatch({ type: FETCH_LIST, payload: [cardlist.data.data] });
    JSON.parse(cardlist.data.data.cardlist_cards).map(async card_id => {
      let card = await apis.get(`/card/${card_id}`);
      dispatch({ type: FETCH_CARDS, payload: [card.data.data] });
    });
  });
};

export const fetchList = board_id => async dispatch => {
  const response = await apis.get(`/board/${board_id}/cardlist`);
  dispatch({ type: FETCH_LIST, payload: response.data.data });
};

export const addList = (board_id, cardlist_name) => async (
  dispatch,
  getState
) => {
  const cardlist_cards = "[]";
  const response = await apis.post(`/cardlist`, {
    board_id,
    cardlist_name,
    cardlist_cards
  });
  if (response.data.state == "ok") {
    const cardlist_id = response.data.data;

    const card = await apis.get(`/cardlist/${cardlist_id}`);
    dispatch({ type: ADD_LIST, payload: [card.data.data] });

    const board = getState().boards[board_id];
    const board_lists = String(board.board_lists);
    let form = new FormData();
    form.append("board_id", board_id);
    form.append("board_lists", board_lists);
    await apis.patch(`board/${board_id}`, form);
  }
};

export const editList = (list_id, formValues) => async dispatch => {
  const response = await apis.patch(`/cardlist/${list_id}`, { ...formValues });
  dispatch({ type: EDIT_LIST, payload: response.data.data });
};

export const deleteList = (list_id, board_id) => async (dispatch, getState) => {
  await apis.delete(`/cardlist/${list_id}`);

  const board = getState().boards[board_id];
  const lists = board.lists.filter(listId => listId !== list_id);

  await apis.patch(`/board/${board_id}`, { lists: lists });
  await apis.delete(`/cardlist/${list_id}`);

  dispatch({ type: DELETE_LIST, payload: { list_id, board_id } });
};

export const fetchCards = list_id => async dispatch => {
  const response = await apis.get(`/cardlist/${list_id}/cards`);
  dispatch({ type: FETCH_CARDS, payload: response.data.data });
};

export const addCard = (cardlist_id, card_name) => async (
  dispatch,
  getState
) => {
  const card_secret = 0;
  const card_contents = "";
  const response = await apis.post(`/card`, {
    card_name,
    cardlist_id,
    card_secret
  });
  const card_id = response.data.data;
  if (response.data.state === "ok") {
    dispatch({
      type: ADD_CARD,
      payload: { cardlist_id, card_id, card_secret, card_contents, card_name }
    });
    const cardList = getState().cardLists[cardlist_id];
    const cardlist_cards = String(cardList.cardlist_cards);
    const cardlist_name = cardList.cardlist_name;
    await apis.put("/cardlist", { cardlist_cards, cardlist_id, cardlist_name });
  }
};

export const editCard = (card_id, formValues) => async dispatch => {
  const response = await apis.patch(`/card/${card_id}`, { ...formValues });
  dispatch({ type: EDIT_CARD, payload: response.data.data });
};

export const deleteCard = (list_id, card_id) => async (dispatch, getState) => {
  const cardlist = getState().cardlists[list_id];
  const cards = cardlist.cards.filter(cardID => cardID !== card_id);

  await apis.patch(`cardlist/${list_id}`, { cards: cards });
  await apis.delete(`/card/${card_id}`);
  dispatch({ type: DELETE_CARD, payload: { list_id, card_id } });
};

export const sort = (
  droppableIdStart,
  droppableIdEnd,
  droppableIndexStart,
  droppableIndexEnd,
  draggableId,
  type
) => async (dispatch, getState) => {
  console.log("앞으로 테스트 해볼 것들");
  dispatch({ type: DRAG_HAPPENED, payload: "" });
  const response = await apis.get("/member");
  dispatch({ type: FETCH_MEMBERS, payload: response.data });
};
