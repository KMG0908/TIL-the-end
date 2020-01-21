import apis from "../apis/apis";
// import history from "../history";
import { FETCH_MEMBERS } from "./types";

export const fetchMembers = () => async dispatch => {
  const response = await apis.get("/member");
  dispatch({ type: FETCH_MEMBERS, payload: response.data.data });
};
