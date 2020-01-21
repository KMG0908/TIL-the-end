import apis from "../apis/apis";
// import history from "../history";
import { FETCH_MEMBERS } from "./types";

export const fetchMembers = () => async dispatch => {
  const response = await apis.get("/member");
<<<<<<< HEAD
  dispatch({ type: FETCH_MEMBERS, payload: response.data.data });
=======
  dispatch({ type: FETCH_MEMBERS, payload: response.data });
>>>>>>> 42cb57e79d51ee6ba8cbf6f4e351c2fd3f74aed3
};
