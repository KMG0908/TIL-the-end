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
  LOGOUT,
  EDIT_MYINFO,
  EDIT_MYINFO_ERR,
  EDIT_MYINFO_CHANGE_RESET,
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
  FETCH_STATISTICS_DATA,
  SEARCH_KEYWORD,
  SEARCH_CL_BY_TAGS,

  MEM_TAG,
  GET_ALL_TAG,
  GET_DAILY_TASK,
  GET_DAILY_CAL,
  GET_DAILY_LIST,
} from "./types";
import moment from "moment";
import { DisplayFormat } from "devextreme-react/date-box";
import { isEmail, matches } from "validator";

export const fetchMembers = () => async dispatch => {
  const response = await apis.get("/member");
  await dispatch({ type: FETCH_MEMBERS, payload: response.data.data });
};

export const login = (loginId, loginPw) => async dispatch => {
  const response = await apis.post(`/member/login`, {
    mem_id: loginId,
    mem_pw: loginPw
  });
  const data = response.data.data;

  if (data.mem_id) {
    const response = await apis.get(`/member/${data.mem_id}`);
    const joinedDate = response.data.data.mem_reg_date.replace(/-/gi, '/');
    // const joinedDate = "2019/02/03";
    var isAvailableWeek = true;
    var isAvailableMonth = true;

    if (new Date(joinedDate) > new Date(moment().subtract(7, "days")))
      isAvailableWeek = false;
    if (new Date(joinedDate) > new Date(moment().startOf("month").subtract(1, "month")))
      isAvailableMonth = false;

    data.joinedDate = joinedDate;
    data.isAvailableWeek = isAvailableWeek;
    data.isAvailableMonth = isAvailableMonth;

    dispatch({ type: LOGIN, payload: data });
  } else {
    dispatch({ type: LOGIN_ERR, payload: data });
  }
};

export const loginErrReset = () => async (dispatch, getState) => {
  if (getState().members.login_err) {
    dispatch({ type: LOGIN_ERR, payload: "" });
  }
};

export const register = (loginId, loginPw, email, nick) => async dispatch => {
  if (!loginId) {
    dispatch({ type: REGISTER_ERR, payload: "아이디를 입력해주세요." });
    return;
  }

  if (!matches(loginId, /^[a-z0-9_\-]{5,20}$/)) {
    dispatch({
      type: REGISTER_ERR,
      payload:
        "올바르지 않은 아이디입니다. 5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다."
    });
    return;
  }

  if (!loginPw) {
    dispatch({ type: REGISTER_ERR, payload: "비밀번호를 입력해주세요." });
    return;
  }

  if (!matches(loginPw, /^[a-zA-Z0-9!@#$%^&*()]{8,16}$/)) {
    dispatch({
      type: REGISTER_ERR,
      payload:
        "올바르지 않은 비밀번호입니다. 8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요."
    });
    return;
  }

  if (!email) {
    dispatch({ type: REGISTER_ERR, payload: "이메일을 입력해주세요." });
    return;
  }

  if (!isEmail(email)) {
    dispatch({ type: REGISTER_ERR, payload: "잘못된 이메일 형식입니다." });
    return;
  }

  if (!nick) {
    dispatch({ type: REGISTER_ERR, payload: "닉네임을 입력해주세요." });
    return;
  }

  const response = await apis.post(`/member`, {
    mem_id: loginId,
    mem_pw: loginPw,
    mem_email: email,
    mem_nick: nick
  });

  if (response.data.data !== loginId) {
    dispatch({ type: REGISTER_ERR, payload: response.data.data });
  } else {
    dispatch({ type: REGISTER, payload: response.data.data });
  }
};

export const registerReset = () => async dispatch => {
  dispatch({ type: REGISTER_RESET });
};

export const setLoggedInfo = loggedInfo => async dispatch => {
  dispatch({ type: SET_LOGGED_INFO, payload: loggedInfo });
};

export const getLoggedInfo = () => async dispatch => {
  dispatch({ type: GET_LOGGED_INFO });
};

export const logout = () => async dispatch => {
  dispatch({ type: LOGOUT });
};

export const editMyinfo = (loginId, loginPw, email, nick) => async dispatch => {
  if (!loginPw) {
    dispatch({ type: EDIT_MYINFO_ERR, payload: "비밀번호를 입력해주세요." });
  }
  if (!email) {
    dispatch({ type: EDIT_MYINFO_ERR, payload: "이메일을 입력해주세요." });
  }
  if (!nick) {
    dispatch({ type: EDIT_MYINFO_ERR, payload: "닉네임을 입력해주세요." });
  }
  const response = await apis.put(`/member`, {
    mem_id: loginId,
    mem_pw: loginPw,
    mem_email: email,
    mem_nick: nick
  });

  const data = response.data.data;

  console.log("data");
  console.log(data);
  if (data.mem_id) {
    dispatch({ type: EDIT_MYINFO, payload: data });
  } else {
    dispatch({ type: EDIT_MYINFO_ERR, payload: data });
  }
};
export const editMyinfoErrReset = () => async (dispatch, getState) => {
  if (getState().members.edit_myinfo_err) {
    dispatch({ type: EDIT_MYINFO_ERR, payload: "" });
  }
};
export const memInfoChangeReset = () => async (dispatch, getState) => {
  if (getState().members.mem_info_change) {
    dispatch({ type: EDIT_MYINFO_CHANGE_RESET });
  }
};

export const addBoard = (mem_id, board_date) => async dispatch => {
  const board_lists = "[]";
  const response = await apis.post("/board", {
    mem_id,
    board_date,
    board_lists
  });
  dispatch({
    type: ADD_BOARD,
    payload: { mem_id, board_date, board_lists, board_id: response.data.data }
  });
};

export const fetchDailyLists = (mem_id, board_date) => async dispatch => {
  const response = await apis.get(`/board/member/${mem_id}/date/${board_date}`);
  console.log(response);
  if (response.data.data.length) {
    dispatch({ type: FETCH_DAILY_LIST, payload: response.data.data[0] });

    response.data.data[0].board_lists.map(async cardlist_id => {
      let cardlist = await apis.get(`/cardlist/${cardlist_id}`);
      if (cardlist.data.state === "ok") {
        dispatch({ type: FETCH_LIST, payload: [cardlist.data.data] });
        cardlist.data.data.cardlist_cards.map(async card_id => {
          let card = await apis.get(`/card/${card_id}`);
          dispatch({ type: FETCH_CARDS, payload: [card.data.data] });
        });
      }
    });
  }
};

export const fetchTodoLists = mem_id => async dispatch => {
  const response = await apis.get(`/board/member/${mem_id}/date/9999-12-31`);
  if (response.data.data.length) {
    dispatch({ type: FETCH_TODO_LIST, payload: response.data.data[0] });
    response.data.data[0].board_lists.map(async cardlist_id => {
      let cardlist = await apis.get(`/cardlist/${cardlist_id}`);
      if (cardlist.data.state === "ok") {
        dispatch({ type: FETCH_LIST, payload: [cardlist.data.data] });
        console.log(cardlist.data.data.cardlist_cards);
        cardlist.data.data.cardlist_cards.map(async card_id => {
          let card = await apis.get(`/card/${card_id}`);
          dispatch({ type: FETCH_CARDS, payload: [card.data.data] });
        });
      }
    });
  }
};

export const fetchList = board_id => async dispatch => {
  const response = await apis.get(`/board/${board_id}/cardlist`);
  dispatch({ type: FETCH_LIST, payload: response.data.data });
};

export const addList = (board_id, cardlist_name, board_date) => async (
  dispatch,
  getState
) => {
  if (!board_id) {
    const board_lists = "[]";
    const mem_id = getState().members.mem_info.mem_id;
    const res = await apis.post("/board", {
      mem_id,
      board_date,
      board_lists
    });
    board_id = res.data.data;
    dispatch({
      type: ADD_BOARD,
      payload: { mem_id, board_date, board_lists, board_id }
    });
  }

  const cardlist_cards = "[]";
  const cardlist_secret = 0;
  const response = await apis.post(`/cardlist`, {
    board_id,
    cardlist_name,
    cardlist_cards,
    cardlist_secret
  });
  if (response.data.state == "ok") {
    const cardlist_id = response.data.data;

    const card = await apis.get(`/cardlist/${cardlist_id}`);
    dispatch({ type: ADD_LIST, payload: [card.data.data] });

    const board = getState().boards[board_id];
    const board_lists = JSON.stringify(board.board_lists);
    let form = new FormData();
    form.append("board_id", board_id);
    form.append("", board_lists);
    await apis.patch(`board/${board_id}`, form);
  }
};

export const editList = cardlist => async dispatch => {
  const response = await apis.put(`/cardlist`, {
    cardlist_id: cardlist.cardlist_id,
    cardlist_name: cardlist.cardlist_name,
    cardlist_cards: JSON.stringify(cardlist.cardlist_cards)
  });
  if (response.data.state === "ok") {
    dispatch({ type: EDIT_LIST, payload: cardlist });
  }
};

export const deleteList = (list_id, board_id) => async (dispatch, getState) => {
  await apis.delete(`/cardlist/${list_id}`);

  const board = getState().boards[board_id];
  console.log(board.board_lists);
  board.board_lists = board.board_lists.filter(listId => listId !== list_id);
  console.log(JSON.stringify(board.board_lists));

  let form = new FormData();
  form.append("board_id", board_id);
  form.append("board_lists", JSON.stringify(board.board_lists));
  await apis.patch(`/board/${board_id}`, form);
  await apis.delete(`/cardlist/${list_id}`);

  dispatch({ type: DELETE_LIST, payload: { list_id, board } });
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
    const cardlist_cards = JSON.stringify(cardList.cardlist_cards);
    const cardlist_name = cardList.cardlist_name;
    await apis.put("/cardlist", { ...cardList, cardlist_cards });
  }
};

export const editCard = card => async dispatch => {
  const response = await apis.put(`/card`, { ...card });
  if (response.data.state == "ok") {
    dispatch({ type: EDIT_CARD, payload: card });
  }
};

export const deleteCard = (list_id, card_id) => async (dispatch, getState) => {
  const cardlist = getState().cardLists[list_id];
  const cardlist_cards = cardlist.cardlist_cards.filter(
    card => card !== card_id
  );
  cardlist.cardlist_cards = cardlist_cards;

  await apis.put(`/cardlist`, { ...cardlist, cardlist_cards });
  await apis.delete(`/card/${card_id}`);

  dispatch({ type: DELETE_CARD, payload: { cardlist, card_id } });
};

export const sort = (
  droppableIdStart,
  droppableIdEnd,
  droppableIndexStart,
  droppableIndexEnd,
  draggableId,
  type
) => async (dispatch, getState) => {
  if (type === "card" || type === "card1") {
    const card_id = parseInt(draggableId.split("-")[1]);
    if (droppableIdStart === droppableIdEnd) {
      const cardlist = getState().cardLists[droppableIdStart];

      cardlist.cardlist_cards.splice(droppableIndexStart, 1);
      cardlist.cardlist_cards.splice(droppableIndexEnd, 0, card_id);
      const cardlist_cards = JSON.stringify(cardlist.cardlist_cards);
      apis.put(`/cardlist`, { ...cardlist, cardlist_cards });
    } else {
      const cardlistFrom = getState().cardLists[droppableIdStart];
      const cardlistTo = getState().cardLists[droppableIdEnd];
      const card = getState().cards[card_id];
      card.cardlist_id = droppableIndexEnd;
      cardlistFrom.cardlist_cards.splice(droppableIndexStart, 1);
      cardlistTo.cardlist_cards.splice(droppableIndexEnd, 0, card_id);
      apis.put("/card", { ...card });
      apis.put(`/cardlist`, {
        ...cardlistFrom,
        cardlist_cards: JSON.stringify(cardlistFrom.cardlist_cards)
      });
      apis.put(`/cardlist`, {
        ...cardlistTo,
        cardlist_cards: JSON.stringify(cardlistTo.cardlist_cards)
      });
    }
  } else {
    const list_id = parseInt(draggableId.split("-")[1]);
    const board = getState().boards[droppableIdStart];
    board.board_lists.splice(droppableIndexStart, 1);
    board.board_lists.splice(droppableIndexEnd, 0, list_id);

    let form = new FormData();
    form.append("board_id", droppableIdStart);
    form.append("board_lists", JSON.stringify(board.board_lists));
    apis.patch(`/board/${droppableIdStart}`, form);
  }
};

export const fetchStatisticsMember = mem_id => async (dispatch, getState) => {
  if (!getState().statistics.mem_info) {
    const response = await apis.get(`/member/${mem_id}`);
    //const joinedDate = moment(response.data.data.mem_reg_date.replace(/-/gi, '/'));
    const joinedDate = moment("2019/02/03");
    var isAvailableWeek = true;
    var isAvailableMonth = true;

    if (new Date(joinedDate) > new Date(moment().subtract(7, "days")))
      isAvailableWeek = false;
    if (
      new Date(joinedDate) >
      new Date(
        moment()
          .startOf("month")
          .subtract(1, "month")
      )
    )
      isAvailableMonth = false;

    const mem_info = {
      mem_id: mem_id,
      joinedDate: joinedDate,
      isAvailableWeek: isAvailableWeek,
      isAvailableMonth: isAvailableMonth
    };

    dispatch({ type: FETCH_STATISTICS_MEMBER, payload: mem_info });
  }
};

export const fetchStatisticsData = (
  startDate,
  endDate,
  availableDate
) => async (dispatch, getState) => {
  const joinedDate = getState().members.mem_info.joinedDate;
  //const joinedDate = moment('2019/02/03')
  var calendarStartDate = startDate;
  if (new Date(joinedDate) > new Date(calendarStartDate))
    calendarStartDate = moment(joinedDate);

  const date = {
    startDate: calendarStartDate,
    endDate: endDate,
    availableDate: availableDate,
    joinedDate: joinedDate
  };

  if (!availableDate) {
    date["availableDate"] = getState().statistics.info.date.availableDate;
  }

  var start = date_to_str(new Date(startDate), "");
  var end = date_to_str(new Date(endDate), "");

  var dates = [];
  var dailyTask = [];

  var response = await apis.get(`/card/daily/private/${getState().members.mem_info.mem_id}/from/${start}/to/${end}`);
  const responseData = response.data.data;

  for (let i = 0; i < responseData.length; i++) {
    console.log(responseData[i].board_date + " " + responseData[i].board_id)
    dates.push(date_to_str(new Date(moment(responseData[i].board_date)), "-"))
    dailyTask.push(responseData[i].board_id);
  }

  // let cnt = 0;
  // const getRandom = (min, max) => Math.floor(Math.random() * (max - min) + min);
  // while (true) {
  //   let date_ = date_to_str(
  //     new Date(moment(date["startDate"]).add(cnt, "days")),
  //     "-"
  //   );
  //   if (date_ === date_to_str(new Date(date["endDate"]), "-")) break;
  //   dates.push(date_);
  //   dailyTask.push(getRandom(0, 10));
  //   cnt++;
  // }

  const data = {
    dates: dates,
    dailyTask: dailyTask
  };

  response = await apis.get(
    `/tag/public/${getState().members.mem_info.mem_id}/from/${start}/to/${end}`
  );
  const tag_data = response.data.data;

  const info = {
    date: date,
    data: data,
    tag_data: tag_data
  };

  dispatch({ type: FETCH_STATISTICS_DATA, payload: info });
};

function date_to_str(format, separator) {
  let year = format.getFullYear();
  let month = format.getMonth() + 1;
  let date = format.getDate();

  return (
    year +
    separator +
    ("0" + month).slice(-2) +
    separator +
    ("0" + date).slice(-2)
  );
}

export const searchKeyword = (keyword, type) => async (dispatch, getState) => {
  let response;
  console.log("searchKeyword");
  console.log(`keyword : ${keyword} , type : ${type}`);
  if (type === undefined) type = "card";
  if (type == "member") {
    response = await apis.get(`/member/searchById/${keyword}`);
  } else {
    response = await apis.get(`/search/global/${type}/by/${keyword}`);
  }
  const cards = response.data.data;
  console.log("cards");
  console.log(cards);
  dispatch({ type: SEARCH_KEYWORD, payload: cards });
};

export const searchCLByTags = (tags) => async ( dispatch, getState) => {
  // const response = await apis.post('/search/cardlist/by/tags', {
  //   tags
  // });
  // const data = response.data.data;
  // console.log(data);
  dispatch ( { type : SEARCH_CL_BY_TAGS, payload : tags})
}


export const memTag = (mem_id, from, to) => async (dispatch, getState) => {
  const response = await apis.get(
    `/tag/public/${mem_id}/from/${from}/to/${to}`
  );
  dispatch({ type: MEM_TAG, payload: response.data.data });
};

export const getAllTag = () => async (dispatch, getState) => {
  const response = await apis.get(
    `/tag `
  )
  const datas = response.data.data
  const data_ = []
  datas.map(data => data_.push('#'+data.tag_name))
  dispatch({ type : GET_ALL_TAG, payload : data_})
}

export const getDailyTask = (mem_id, from, to) => async (dispatch, getState) => {
  const start = date_to_str(from, "");
  const end = date_to_str(to, "");
  const response = await apis.get(
    `/card/daily/private/${mem_id}/from/${start}/to/${end}`
  );
  console.log(response);
  dispatch({ type: GET_DAILY_TASK, payload: response.data.data });
};

export const getDailyCal = (mem_id, from, to) => async dispatch => {
  const start = 20190101;
  const end = date_to_str(to, "");

  console.log(end);
  const response = await apis.get(
    `/board/member/${mem_id}/from/${start}/to/${end}`
  );
  console.log(response.data.data);
  dispatch({ type: GET_DAILY_CAL, payload: response.data.data });

  //const arr = await apis.get(`/board/${response.data.data[i].board_id}`);
  let app = [];

  for (let i = 0; i < response.data.data.length; i++) {
    console.log("aaaaaaaaaaaa")
    let cardlist = await apis.get(`/board/${response.data.data[i].board_id}`);
    if (cardlist.data.state === "ok") {
      console.log(cardlist.data.data)
      //dispatch({ type: GET_DAILY_CAL, payload: [cardlist.data.data] });
    }
  }
  console.log(app)
  
  dispatch({ type: GET_DAILY_CAL, payload: app });

};



export const getDailyList = (board_li) => async (dispatch, getState) => {
  const response = await apis.get(`/board/${board_li}`);
  console.log(response)
  dispatch({ type: GET_DAILY_LIST, payload: response.data.data });
};
