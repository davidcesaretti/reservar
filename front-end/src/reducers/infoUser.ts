import { getUserInfo, userInformation } from "../actions/index";
import { ActionTypes } from "../actions/types";

export const userInfo = (state: Object = {}, action: userInformation) => {
  switch (action.type) {
    case ActionTypes.userInfo:
      console.log("entro info");
      return action.payload;
    default:
      return state;
  }
};