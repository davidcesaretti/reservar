import { Favourites } from "../actions";
import { ActionTypes } from "../actions/types";

export const favReducer = (state: Object = {}, action: Favourites) => {
  switch (action.type) {
    case ActionTypes.addFav:
      return action.payload;
    default:
      return state;
  }
};
