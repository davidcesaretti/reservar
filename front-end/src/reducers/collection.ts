import { Collection } from "../actions/index";
import { ActionTypes } from "../actions/types";

export const setCollectionRed = (state: string = "", action: Collection) => {
  switch (action.type) {
    case ActionTypes.setCollection:
      console.log("entro Collection");
      return action.payload;
    default:
      return state;
  }
};
