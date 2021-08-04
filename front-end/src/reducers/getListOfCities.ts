import { listOfCities } from "../actions";
import { ActionTypes } from "../actions/types";

export const getListOfCities = (state: Array<String> = [], action: listOfCities) => {
  switch (action.type) {
    case ActionTypes.listCities:
      return action.payload;
    default:
      return state;
  }
};
