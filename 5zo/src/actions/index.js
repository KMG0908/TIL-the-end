import apis from "../apis/apis";
// import history from "../history";
import {
  FETCH_MEMBERS,
  LOGIN,
  LOGIN_ERR,
  REGISTER,
  REGISTER_ERR,
  REGISTER_RESET,
  SET_LOGGED_INFO,
  GET_LOGGED_INFO,
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
  DELETE_CARD,
  FETCH_STATISTICS_MEMBER,
  FETCH_STATISTICS_DATA
} from "./types";
import moment from "moment";

export const fetchMembers = () => async dispatch => {
  const response = await apis.get("/member");
  await dispatch({ type: FETCH_MEMBERS, payload: response.data.data });
};

export const login = (loginId, loginPw) => async dispatch => {
  const response = await apis.post(`/member/login`, {
    "mem_id": loginId,
    "mem_pw": loginPw
  });
  const data = response.data.data;
  
  if(data.mem_id){
    const response = await apis.get(`/member/${data.mem_id}`);
    //const joinedDate = response.data.data.mem_reg_date.replace(/-/gi, '/');
    const joinedDate = '2019/02/03'
    var isAvailableWeek = true;
    var isAvailableMonth = true;
    
    if(new Date(joinedDate) > new Date(moment().subtract(7, 'days'))) isAvailableWeek = false;
    if(new Date(joinedDate) > new Date(moment().startOf('month').subtract(1, 'month'))) isAvailableMonth = false;

    data.joinedDate = joinedDate;
    data.isAvailableWeek = isAvailableWeek;
    data.isAvailableMonth = isAvailableMonth;

    dispatch({ type: LOGIN, payload: data })
  }
  else{
    dispatch({ type: LOGIN_ERR, payload: data })
  }
}

export const loginErrReset = () => async (dispatch, getState) => {
  if(getState().members.login_err){
    dispatch({ type: LOGIN_ERR, payload: "" })
  }
}

export const register = (loginId, loginPw, email, nick) => async dispatch => {
  const response = await apis.post(`/member`, {
    "mem_id": loginId,
    "mem_pw": loginPw,
    "mem_email": email,
    "mem_nick": nick
  })

  if(response.data.data !== loginId){
    dispatch({ type: REGISTER_ERR, payload: response.data.data })
  }
  else{
    dispatch({ type: REGISTER, payload: response.data.data })
  }
}

export const registerReset = () => async dispatch => {
  dispatch({ type: REGISTER_RESET })
}

export const setLoggedInfo = (loggedInfo) => async dispatch => {
  dispatch({ type: SET_LOGGED_INFO, payload: loggedInfo})
}

export const getLoggedInfo = () => async dispatch => {
  dispatch({ type: GET_LOGGED_INFO })
}

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

export const fetchStatisticsMember = mem_id => async(dispatch, getState) => {
  if(!getState().statistics.mem_info){
    const response = await apis.get(`/member/${mem_id}`);
    //const joinedDate = moment(response.data.data.mem_reg_date.replace(/-/gi, '/'));
    const joinedDate = moment('2019/02/03')
    var isAvailableWeek = true;
    var isAvailableMonth = true;
  
    if(new Date(joinedDate) > new Date(moment().subtract(7, 'days'))) isAvailableWeek = false;
    if(new Date(joinedDate) > new Date(moment().startOf('month').subtract(1, 'month'))) isAvailableMonth = false;
  
    const mem_info = {
      mem_id : mem_id,
      joinedDate : joinedDate,
      isAvailableWeek : isAvailableWeek,
      isAvailableMonth : isAvailableMonth
    }
  
    dispatch({ type: FETCH_STATISTICS_MEMBER, payload: mem_info});
  }
}

export const fetchStatisticsData = (startDate, endDate, availableDate) => async (dispatch, getState) => {
  console.log(getState())
  const joinedDate = getState().members.mem_info.joinedDate;
  //const joinedDate = moment('2019/02/03')
  var calendarStartDate = startDate;
  if(new Date(joinedDate) > new Date(calendarStartDate)) calendarStartDate = joinedDate;
  
  const date = {
    startDate : calendarStartDate,
    endDate : endDate,
    availableDate : availableDate,
    joinedDate : joinedDate
  }
  
  if(!availableDate){
    date['availableDate'] = getState().statistics.info.date.availableDate
  }

  const dates = []
  const dailyTask = []

  // const response = await apis.get(`/card/daily/all/${getState().statistics.mem_info.mem_id}`);
  // const responseData = response.data.data;

  // for(let i=0; i<responseData.length; i++){
  //   console.log(responseData[i].board_date + " " + responseData[i].board_id)
  //   dates.push(date_to_str(new Date(moment(responseData[i].board_date)), "-"))
  //   dailyTask.push(responseData[i].board_id);
  // }

  let cnt = 0;
  const getRandom = (min, max) => Math.floor(Math.random() * (max - min) + min);
  while(true){
    let date_ = date_to_str(new Date(moment(date['startDate']).add(cnt, 'days')), "-");
    if(date_ === date_to_str(new Date(date['endDate']), "-")) break;
    dates.push(date_);
    dailyTask.push(getRandom(0, 10))
    cnt++;
  }

  const data = {
    dates: dates,
    dailyTask: dailyTask
  }
  
  const info = {
    date : date,
    data : data
  }

  dispatch({ type: FETCH_STATISTICS_DATA, payload: info});
};

function date_to_str(format, separator){
  let year = format.getFullYear();
  let month = format.getMonth() + 1;
  let date = format.getDate();

  return year + separator + ("0" + month).slice(-2) + separator + ("0" + date).slice(-2);
}
