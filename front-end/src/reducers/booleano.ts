import { Booleano } from "../actions/index";
import { ActionTypes } from "../actions/types";

export const booleanoRed = (state: boolean = false, action: Booleano) => {
  switch (action.type) {
    case ActionTypes.booleanState:
      console.log("cambia booleano");
      return !state;
    default:
      return state;
  }
};
