import { Favourites } from "../actions/index";
import { ActionTypes } from "../actions/types";

export const favReducer = (state: [], action: Favourites) => {
  switch (action.type) {
    case ActionTypes.addFav:
      console.log("entro fav");
      return action.payload;
    default:
      return state;
  }
};
