import { Bookchat } from "../actions/index";
import { ActionTypes } from "../actions/types";

export const bookchatRed = (state: Array<Object> = [], action: Bookchat) => {
  switch (action.type) {
    case ActionTypes.bookchat:
      console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaa");
      return action.payload;
    default:
      return state;
  }
};
