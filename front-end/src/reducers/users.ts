import { fake, FetchUsersAction } from "../actions/index";
import { ActionTypes } from "../actions/types";

export const usersReducer = (state: fake[] = [], action: FetchUsersAction) => {
  switch (action.type) {
    case ActionTypes.fetchUsers:
      return action.payload;
    default:
      return state;
  }
};
