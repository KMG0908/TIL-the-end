import apis from "../apis/apis";
// import history from "../history";
import {
  FETCH_MEMBERS,
  DRAG_HAPPENED,
  FETCH_DAILY_LIST,
  FETCH_TODO_LIST,
  FETCH_LIST,
  ADD_LIST,
  EDIT_LIST_TITLE,
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

export const fetchDailyLists = (user_id, date) => async dispatch => {
  const response = await apis.get(`/board?mem_id=${user_id}&date=${date}`);
  dispatch({ type: FETCH_DAILY_LIST, payload: response.data.data });
};

export const fetchTodoLists = user_id => async dispatch => {
  const response = await apis.get(`/board?mem_id=${user_id}`);
  dispatch({ type: FETCH_TODO_LIST, payload: response.data.data });
};

export const fetchList = list_id => async dispatch => {
  const response = await apis.get(`list/${list_id}`);
  dispatch({ type: FETCH_LIST, payload: response.data.data });
};

export const addList = (board_id, formValues) => async dispatch => {
  const response = await apis.post("/board_id", { ...formValues });
  dispatch({ type: ADD_LIST, payload: response.data.data });
};



export const editList = (list_id, formValues) => async dispatch => {
  const response = await apis.patch(`/${list_id}`, { ...formValues });
  dispatch({ type: EDIT_LIST_TITLE, payload: response.data.data });
};


export const deleteList = (list_id) => async dispatch => {
  await apis.delete(`/${list_id}`);
  dispatch({ type: DELETE_LIST, payload: list_id});
};



export const fetchCards = (list_id) => async dispatch => {
  const response = await apis.get(`/${list_id}`);
  dispatch({ type: FETCH_CARDS, payload: response.data.data});
};


export const addCard = (list_id, formValues) => async dispatch => {
  const response = await apis.post(`/${list_id}`,{...formValues});
  dispatch({ type: ADD_CARD, payload: response.data.data});
};

export const editCard = (card_id, formValues) => async dispatch => {
  const response = await apis.patch(`/${card_id}`,{...formValues});
  dispatch({ type: EDIT_CARD, payload: response.data.data});
};

export const deleteCard = (card_id) => async dispatch => {
  await apis.patch(`/${card_id}`);
  dispatch({ type: DELETE_CARD, card_id});
};