import apis from "../apis/apis";
// import history from "../history";
import {
  // MEMBER
  FETCH_MEMBERS,
  GET_ALL_MEMBERS,
  GET_ALL_MEMBER_DATA,
  LOGIN,
  LOGIN_ERR,
  REGISTER,
  REGISTER_ERR,
  REGISTER_RESET,
  SET_LOGGED_INFO,
  GET_LOGGED_INFO,
  LOGOUT,
  DELETE_ACCOUNT,
  DELETE_ACCOUNT_ERR,
  DELETE_ACCOUNT_SUCCESS,
  EDIT_MYINFO,
  EDIT_MYINFO_ERR,
  EDIT_MYINFO_CHANGE_RESET,
  EDIT_MY_COLOR_FAIL,
  EDIT_MY_COLOR_RESET,
  EDIT_PASSWORD_FAIL,
  EDIT_PASSWORD_FAIL_RESET,
  EDIT_PASSWORD_SUCCESS,
  EDIT_PASSWORD_SUCCESS_RESET,
  FIND_ID_SUCCESS,
  FIND_ID_SUCCESS_RESET,
  FIND_ID_FAIL,
  FIND_ID_FAIL_RESET,
  FIND_PW_SUCCESS,
  FIND_PW_SUCCESS_RESET,
  FIND_PW_FAIL,
  FIND_PW_FAIL_RESET,
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
  SEARCH_CARDLIST,
  MEM_TAG,
  GET_ALL_TAG,
  FETCH_TAG,
  GET_DAILY_TASK,
  GET_DAILY_CAL,
  GET_DAILY_LIST,
  GET_OTHER_MEMBER,
  SET_EDIT_MODE_LIST,
  SET_EDIT_MODE_CARD,
  ADD_TAG,
  DELETE_TAG,
  FETCH_COMMENTS,
  ADD_COMMENT,
  DELETE_COMMENT,
  PUT_COMMENT,
  EDIT_MYPROFILE
} from "./types";
import moment from "moment";
import { DisplayFormat } from "devextreme-react/date-box";
import { isEmail, matches } from "validator";
import storage from "lib/storage";

export const fetchMembers = () => async dispatch => {
  const response = await apis.get("/member");
  await dispatch({ type: FETCH_MEMBERS, payload: response.data.data });
};
export const getAllMember = () => async dispatch => {
  const response = await apis.get("/member");

  const datas = response.data.data;
  const data_ = [];
  datas.map(data =>
    data.mem_id !== "admin" ? data_.push("@" + data.mem_id) : null
  );
  data_.sort();
  console.log(data_);
  await dispatch({ type: GET_ALL_MEMBERS, payload: data_ });
};

export const getAllMemberData = keyword => async dispatch => {
  let response;
  if (keyword === "") {
    response = await apis.get(`/member`);
  } else {
    response = await apis.get(`/member/searchByIdLike/${keyword}`);
  }
  const data = response.data.data;
  if (data) {
    dispatch({ type: GET_ALL_MEMBER_DATA, payload: data });
  }
};

export const login = (loginId, loginPw) => async dispatch => {
  const response = await apis.post(`/member/login`, {
    mem_id: loginId,
    mem_pw: loginPw
  });
  const data = response.data.data;

  if (data.mem_id) {
    const response = await apis.get(`/member/${data.mem_id}`);
    const joinedDate = response.data.data.mem_reg_date.replace(/-/gi, "/");
    // const joinedDate = "2019/02/03";
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

export const deleteAccount = (mem_id, mem_pw) => async dispatch => {
  let response;
  console.log(`mem_id : ${mem_id} , mem_pw : ${mem_pw}`);
  response = await apis.post(`/member/login`, {
    mem_id: mem_id,
    mem_pw: mem_pw
  });
  console.log("deleteAccount");
  console.log(response);
  if (response.data.state === "ok") {
    response = await apis.delete(`/member/${mem_id}`);
    if (response.data.state === "ok") {
      dispatch({ type: DELETE_ACCOUNT_SUCCESS });
    } else {
      console.log("회원탈퇴오류");
      dispatch({ type: DELETE_ACCOUNT_ERR, payload: "회원 탈퇴 실패" });
    }
  } else {
    console.log("회원탈퇴실패 - 비밀번호 틀림");

    dispatch({ type: DELETE_ACCOUNT_ERR, payload: "비밀번호 틀림" });
  }
};

export const deleteAccountErrReset = () => async (dispatch, getState) => {
  if (getState().members.delete_account_err) {
    dispatch({ type: DELETE_ACCOUNT_ERR, payload: "" });
  }
};

export const deleteAccountSuccessReset = () => async (dispatch, getState) => {
  if (getState().members.delete_account_success) {
    dispatch({ type: DELETE_ACCOUNT_SUCCESS, payload: "" });
  }
};

export const editMyProfile = (
  loginId,
  nick,
  intro,
  checked,
  color,
  thumb
) => async dispatch => {
  const response = await apis.put(`/member`, {
    mem_id: loginId,
    mem_nick: nick,
    mem_color: color,
    mem_thumb: thumb,
    mem_self_intro: intro
  });

  const data = response.data.data;

  console.log("profile");
  console.log(data);
  if (data.mem_id) {
    dispatch({ type: EDIT_MYPROFILE, payload: data });
  }
};

export const editMyinfo = (
  loginId,
  nowPw,
  email,
  nick,
  color,
  thumb,
  intro
) => async dispatch => {
  console.log("index");
  console.log(thumb);
  if (!nowPw) {
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
    mem_pw: nowPw,
    mem_email: email,
    mem_nick: nick,
    mem_color: color,
    mem_thumb: thumb,
    mem_self_intro: intro
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

export const changeMemInfo = (beforeMyInfo, afterMyInfo) => async (
  dispatch,
  getState
) => {
  dispatch({ type: SET_LOGGED_INFO, payload: afterMyInfo });
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
export const editMyDefSecret = (mem_id, checked) => async (
  dispatch,
  getState
) => {
  const response = await apis.patch(`/member/postdef/${mem_id}`);
  console.log(response);
  const data = response.data.data;

  if (data) {
    const user = (await apis.get(`/member/${mem_id}`)).data.data;
    console.log("user");
    console.log(user);
    dispatch({ type: EDIT_MYINFO, payload: user });
  } else {
    dispatch({ type: EDIT_MY_COLOR_FAIL });
  }
};
export const editMyColor = (mem_id, color) => async (dispatch, getState) => {
  const color_encode = encodeURIComponent(color);
  const response = await apis.patch(`/member/${mem_id}/color/${color_encode}`);

  const data = response.data.data;
  console.log("data");
  console.log(data);

  if (data) {
    const user = (await apis.get(`/member/${mem_id}`)).data.data;
    console.log("user");
    console.log(user);
    dispatch({ type: EDIT_MYINFO, payload: user });
  } else {
    dispatch({ type: EDIT_MY_COLOR_FAIL });
  }
};
export const editMyColorFailReset = () => async (dispatch, getState) => {
  if (getState().members.mem_color_change_fail) {
    dispatch({ type: EDIT_MY_COLOR_FAIL });
  }
};

export const editPassword = (mem_id, old_pw, new_pw) => async (
  dispatch,
  getState
) => {
  console.log("mem_id : " + mem_id);
  console.log("old_pw : " + old_pw);
  console.log("new_pw : " + new_pw);
  const response = await apis.patch(`/member/password/${mem_id}`, {
    old_pw,
    new_pw
  });
  if (response.data.state == "ok") {
    dispatch({ type: EDIT_PASSWORD_SUCCESS });
  } else {
    dispatch({ type: EDIT_PASSWORD_FAIL, payload: response.data.data });
  }
};

export const editPasswordFailReset = () => async (dispatch, getState) => {
  if (getState().members.edit_password_fail) {
    dispatch({ type: EDIT_PASSWORD_FAIL_RESET });
  }
};
export const editPasswordSuccessReset = () => async (dispatch, getState) => {
  if (getState().members.edit_password_success) {
    dispatch({ type: EDIT_PASSWORD_SUCCESS_RESET });
  }
};

export const getOtherMember = user_id => async dispatch => {
  const response = await apis.get(`/member/${user_id}`);

  dispatch({ type: GET_OTHER_MEMBER, payload: response.data.data });
};

export const findId = email => async dispatch => {
  const response = await apis.get(`/email/findId/${email}`);
  if (response.data.state === "ok") {
    dispatch({ type: FIND_ID_SUCCESS });
  } else {
    dispatch({ type: FIND_ID_FAIL, payload: response.data.data });
  }
};
export const findIdSuccessReset = () => async (dispatch, getState) => {
  if (getState().members.find_id_success) {
    dispatch({ type: FIND_ID_SUCCESS_RESET });
  }
};
export const findIdFailReset = () => async (dispatch, getState) => {
  if (getState().members.find_id_fail) {
    dispatch({ type: FIND_ID_FAIL_RESET });
  }
};

export const findPw = (mem_id, email) => async dispatch => {
  const response = await apis.get(`/email/findPw/${mem_id}/${email}`);
  if (response.data.state === "ok") {
    dispatch({ type: FIND_PW_SUCCESS });
  } else {
    dispatch({ type: FIND_PW_FAIL, payload: response.data.data });
  }
};
export const findPwSuccessReset = () => async (dispatch, getState) => {
  if (getState().members.find_pw_success) {
    dispatch({ type: FIND_PW_SUCCESS_RESET });
  }
};
export const findPwFailReset = () => async (dispatch, getState) => {
  if (getState().members.find_pw_fail) {
    dispatch({ type: FIND_PW_FAIL_RESET });
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
  let own = false;
  if (mem_id === storage.get("loggedInfo").mem_id) own = true;

  const response = await apis.get(`/board/member/${mem_id}/date/${board_date}`);
  if (response.data.data.length) {
    dispatch({ type: FETCH_DAILY_LIST, payload: response.data.data[0] });

    response.data.data[0].board_lists.map(async cardlist_id => {
      let cardlist = await apis.get(`/cardlist/${cardlist_id}`);
      if (cardlist.data.state === "ok") {
        console.log("392");
        console.log(cardlist.data.data);
        if (own || (!own && cardlist.data.data.cardlist_secret === false)) {
          dispatch({ type: FETCH_LIST, payload: [cardlist.data.data] });
          cardlist.data.data.cardlist_cards.map(async card_id => {
            let card = await apis.get(`/card/${card_id}`);
            dispatch({ type: FETCH_CARDS, payload: [card.data.data] });
          });

          let tags = await apis.get(`/cardlist_tag/${cardlist_id}`);
          if (tags.data.data.length > 0) {
            dispatch({
              type: FETCH_TAG,
              payload: { cardlist_id: cardlist_id, tags: tags.data.data }
            });
          }
        }
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
  const cardlist_secret = getState().members.mem_info.mem_post_def_secret;
  const cardlist_color = "#94C9A9";
  const response = await apis.post(`/cardlist`, {
    board_id,
    cardlist_name,
    cardlist_cards,
    cardlist_secret,
    cardlist_color
  });
  if (response.data.state == "ok") {
    const cardlist_id = response.data.data;

    const card = await apis.get(`/cardlist/${cardlist_id}`);
    dispatch({ type: ADD_LIST, payload: [card.data.data] });

    const board = getState().boards[board_id];
    const board_lists = JSON.stringify(board.board_lists);
    let form = new FormData();
    console.log(board_lists);
    form.append("board_id", board_id);
    form.append("board_lists", board_lists);
    await apis.patch(`board/${board_id}`, form);
  }
};

export const editList = cardlist => async dispatch => {
  const response = await apis.put(`/cardlist`, {
    ...cardlist,
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
      card.cardlist_id = droppableIdEnd;
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
    if (droppableIdStart === droppableIdEnd) {
      const board = getState().boards[droppableIdStart];
      board.board_lists.splice(droppableIndexStart, 1);
      board.board_lists.splice(droppableIndexEnd, 0, list_id);

      let form = new FormData();
      form.append("board_id", droppableIdStart);
      form.append("board_lists", JSON.stringify(board.board_lists));
      apis.patch(`/board/${droppableIdStart}`, form);
    } else {
      const boardFrom = getState().boards[droppableIdStart];
      const boardTo = getState().boards[droppableIdEnd];
      const cardlist = getState().cardLists[list_id];
      cardlist.board_id = droppableIdEnd;
      boardFrom.board_lists.splice(droppableIndexStart, 1);
      boardTo.board_lists.splice(droppableIndexEnd, 0, list_id);
      apis.put("/cardlist", { ...cardlist });
      let fromForm = new FormData();
      fromForm.append("board_id", droppableIdStart);
      fromForm.append("board_lists", JSON.stringify(boardFrom.board_lists));
      apis.patch(`/board/${droppableIdStart}`, fromForm);
      let toForm = new FormData();
      toForm.append("board_id", droppableIdEnd);
      toForm.append("board_lists", JSON.stringify(boardTo.board_lists));
      apis.patch(`/board/${droppableIdEnd}`, toForm);
    }
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

  var response = await apis.get(
    `/card/daily/private/${
      getState().members.mem_info.mem_id
    }/from/${start}/to/${end}`
  );
  const responseData = response.data.data;

  for (let i = 0; i < responseData.length; i++) {
    console.log(responseData[i].board_date + " " + responseData[i].board_id);
    dates.push(date_to_str(new Date(moment(responseData[i].board_date)), "-"));
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

export const searchCardlist = (keywords, page, limit) => async (
  dispatch,
  getState
) => {
  let keywords_string = ",";
  keywords.map(
    keyword => (keywords_string += encodeURIComponent(keyword) + ",")
  );
  console.log("keywords : " + keywords_string);

  if (!limit) limit = 5;
  if (!page) page = 1;

  const response = await apis.get(
    `/search/global/cardlist/by/${keywords_string}?limit=${limit}&page=${page}`
  );
  const data = response.data.data;
  dispatch({ type: SEARCH_CARDLIST, payload: data });
};

export const memTag = (mem_id, from, to) => async (dispatch, getState) => {
  const response = await apis.get(
    `/tag/public/${mem_id}/from/${from}/to/${to}`
  );
  dispatch({ type: MEM_TAG, payload: response.data.data });
};

export const getAllTag = () => async (dispatch, getState) => {
  const response = await apis.get(`/tag `);
  const datas = response.data.data;
  const data_ = [];
  datas.map(data => data_.push("#" + data.tag_name));
  data_.sort();
  dispatch({ type: GET_ALL_TAG, payload: data_ });
};

export const getDailyTask = (mem_id, from, to) => async dispatch => {
  let own = false;
  if (mem_id === storage.get("loggedInfo").mem_id) own = true;

  const start = date_to_str(from, "");
  const end = date_to_str(to, "");
  let response;
  if (own)
    response = await apis.get(
      `/card/daily/private/${mem_id}/from/${start}/to/${end}`
    );
  else
    response = await apis.get(
      `/card/daily/public/${mem_id}/from/${start}/to/${end}`
    );
  dispatch({ type: GET_DAILY_TASK, payload: response.data.data });
};

export const getDailyCal = (mem_id, from, to) => async dispatch => {
  const start = 20190101;
  const end = date_to_str(to, "");
  let response, cardList, board, cardlist_id, cardlist;
  response = await apis.get(`/board/member/${mem_id}/from/${start}/to/${end}`);
  const board_data = response.data.data;
  console.log(response.data.data);
  let app = [];
  for (let i = 0; i < board_data.length; i++) {
    board = board_data[i];
    response = await apis.get(`/board/${board_data[i].board_id}`);
    let cardList_id_string = response.data.data;
    console.log(cardList_id_string);

    cardList_id_string = cardList_id_string.replace("[", "");
    cardList_id_string = cardList_id_string.replace("]", "");
    const cardlist_id_array = [];
    cardList_id_string
      .split(",")
      .map(cardList =>
        cardList === "" ? null : cardlist_id_array.push(Number(cardList))
      );
    console.log("cardList_id_string ");
    console.log(cardList_id_string);
    console.log(cardlist_id_array);
    for (let j = 0; j < cardlist_id_array.length; j++) {
      cardlist_id = cardlist_id_array[j];
      console.log(cardlist_id)
      response = await apis.get(`/cardlist/${cardlist_id}`);
      cardlist = response.data.data;
      cardlist.date = board.board_date;
      app.push(cardlist);
    }
  }
  dispatch({ type: GET_DAILY_CAL, payload: app });
};

export const getDailyList = board_li => async (dispatch, getState) => {
  const response = await apis.get(`/board/${board_li}`);
  console.log(response.data.data);
  dispatch({ type: GET_DAILY_LIST, payload: response.data.data });
};

export const setEditModeList = list_id => ({
  type: SET_EDIT_MODE_LIST,
  payload: list_id
});

export const setEditModeCard = card_id => ({
  type: SET_EDIT_MODE_CARD,
  payload: card_id
});

export const addTag = (cardlist_id, tag_name) => async disptach => {
  const response = await apis.post(`/cardlist_tag/`, { cardlist_id, tag_name });
  disptach({
    type: ADD_TAG,
    payload: { cardlist_id, tag: { tag_name, tag_id: response.data.data } }
  });
};

export const deleteTag = (cardlist_id, tag_id) => async (
  dispatch,
  getState
) => {
  const response = await apis.delete(`/cardlist_tag/${tag_id}`);
  dispatch({
    type: DELETE_TAG,
    payload: { cardlist_id, tag_id }
  });
};

export const fetchComments = cardlist_id => async dispatch => {
  const response = await apis.get(`/comment/${cardlist_id}`);
  dispatch({
    type: FETCH_COMMENTS,
    payload: { cardlist_id, comments: response.data.data }
  });
};

export const addComment = (
  cardlist_id,
  comment_contents,
  comment_reply
) => async (dispatch, getState) => {
  const comment_secret = 0;
  const { mem_id } = getState().members.mem_info;
  const response = await apis.post(`/comment`, {
    cardlist_id,
    comment_contents,
    comment_reply,
    comment_secret,
    mem_id
  });
  dispatch(fetchComments(cardlist_id));
};

export const deleteComment = (cardlist_id, comment_id) => async dispatch => {
  const response = await apis.delete(`/comment/${comment_id}`);
  dispatch({ type: DELETE_COMMENT, payload: { cardlist_id, comment_id } });
};

export const editComment = (
  cardlist_id,
  comment_id,
  comment_contents
) => async (dispatch, getState) => {
  const comment = getState().comments[cardlist_id][comment_id];
  comment.comment_contents = comment_contents;
  const response = await apis.put(`/comment/${comment_id}`, {
    comment_id,
    comment_secret: comment.comment_secret,
    comment_contents
  });
  // dispatch({ type: FETCH_COMMENTS, payload: comment });
};

export const fetchAlarm = () => async (dispatch, getState) => {};
export const readAlarm = () => async (dispatch, getState) => {};
export const addAlarm = () => async (dispatch, getState) => {};
