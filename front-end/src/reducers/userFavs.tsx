import { USERFAVS } from "../actions";
import { ActionTypes } from "../actions/types";

export const favReducer = (state: [], action: USERFAVS) => {
  switch (action.type) {
    case ActionTypes.favUser:
      console.log("entro fav");
      return [...state, action.payload];
    default:
      return state;
  }
};
