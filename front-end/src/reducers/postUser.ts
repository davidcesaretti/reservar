// import { findPost } from "../actions";
import { ActionTypes } from "../actions/types";

export const postsHost = (state: Array<Object> = [], action) => {
  switch (action.type) {
    case ActionTypes.findPost:
      return action.payload;
    default:
      return state;
  }
};
