import { listOfUsers } from "../actions";
import { ActionTypes } from "../actions/types";

export const userList = (state: Array<Object> = [], action: listOfUsers) => {
  switch (action.type) {
    case ActionTypes.usersList:
      return action.payload;
    default:
      return state;
  }
};
