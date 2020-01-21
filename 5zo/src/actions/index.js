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
  const response = await apis.get("/mem_info");
  dispatch({ type: FETCH_MEMBERS, payload: response.data.data });
};

export const addBoard = (mem_id, board_date, board_type) => async dispatch => {
  const response = await apis.post("/board", {
    mem_id,
    board_date,
    board_type
  });
  dispatch({ type: ADD_BOARD, payload: response.data.data });
};

export const fetchDailyLists = (mem_id, board_date) => async dispatch => {
  const response = await apis.get(
    `/board?mem_id=${mem_id}&board_date=${board_date}`
  );

  dispatch({ type: FETCH_DAILY_LIST, payload: response.data.data });
};

export const fetchTodoLists = mem_id => async dispatch => {
  const response = await apis.get(`/board?mem_id=${mem_id}&board_type="todo"`);
  dispatch({ type: FETCH_TODO_LIST, payload: response.data.data });
};

export const fetchList = board_id => async dispatch => {
  const response = await apis.get(`/board/${board_id}/cardlist`);
  dispatch({ type: FETCH_LIST, payload: response.data.data });
};

export const addList = (board_id, formValues) => async dispatch => {
  const response = await apis.post(`/board/${board_id}/`, { ...formValues });
  const data = response.data.data;
  dispatch({ type: ADD_LIST, payload: { board_id, data } });
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

export const addCard = (list_id, formValues) => async dispatch => {
  const response = await apis.post(`/card`, { ...formValues });
  const data = response.data.data;
  dispatch({ type: ADD_CARD, payload: { list_id, data } });
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
};
