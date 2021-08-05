import { AllPosts } from "../actions";
import { ActionTypes } from "../actions/types";

export const getAllPosts = (state: Array<Object> = [], action: AllPosts) => {
  switch (action.type) {
    case ActionTypes.listPosts:
      return action.payload;
    default:
      return state;
  }
};
