import { Hostres } from "../actions/index";
import { ActionTypes } from "../actions/types";

export const hostresRed = (state: Array<Object> = [], action: Hostres) => {
  switch (action.type) {
    case ActionTypes.hostres:
      console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaa");
      return action.payload;
    default:
      return state;
  }
};
