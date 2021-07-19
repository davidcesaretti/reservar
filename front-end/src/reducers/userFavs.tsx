import { USERFAVS } from "../actions";
import { ActionTypes } from "../actions/types";

export const userFavReducer = (state: Array<Object> = [], action: USERFAVS) => {
  switch (action.type) {
    case ActionTypes.favUser:
      console.log("entro fav");
      return action.payload;
    default:
      return state;
  }
};
