//import { FechasReserva } from "../actions/index";
import { ActionTypes } from "../actions/types";

export const fechasReducer = (state: Object = {}, action) => {
  switch (action.type) {
    case ActionTypes.calendary:
      return action.payload;
    default:
      return state;
  }
};
