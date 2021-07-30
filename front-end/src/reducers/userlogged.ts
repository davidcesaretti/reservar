import { UserEmail } from "../actions/index";
import { ActionTypes } from "../actions/types";

export const usersLoggedRed = (state: string = "", action: UserEmail) => {
  switch (action.type) {
    case ActionTypes.usersLogged:
      return action.payload;
    default:
      return state;
  }
};
