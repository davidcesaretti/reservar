import { USERFAVS } from "../actions";
import { ActionTypes } from "../actions/types";

export const userFavReducer = (state: Array<Object> = [], action: USERFAVS) => {
  switch (action.type) {
    case ActionTypes.favUser:
      return action.payload;
    default:
      return state;
  }
};
