import { User, FetchUsersAction } from "../actions/index";
import { ActionTypes } from "../actions/types";

export const usersReducer = (state: User[] = [], action: FetchUsersAction) => {
  switch (action.type) {
    case ActionTypes.fetchUsers:
      console.log("entro");
      return action.payload;
    default:
      return state;
  }
};
