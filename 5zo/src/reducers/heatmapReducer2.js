import { GET_DAILY_TASK2 } from "actions/types";
import _ from "lodash";
export default (state = {}, action) => {
  switch (action.type) {
    case GET_DAILY_TASK2:
      return {
        ...state,
        info: state.info
          ? _.unionWith(state.info, action.payload, _.isEqual)
          : action.payload
      };
    default:
      return state;
  }
};
