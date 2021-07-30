import { Collection } from "../actions/index";
import { ActionTypes } from "../actions/types";

export const setCollectionRed = (state: string = "", action: Collection) => {
  switch (action.type) {
    case ActionTypes.setCollection:
      return action.payload;
    default:
      return state;
  }
};
