import { SignedInUser } from "../actions/index";
import { ActionTypes } from "../actions/types";


export const signedReducer = (state: boolean, action: SignedInUser) => {
  switch (action.type) {
    case ActionTypes.signUser:
      console.log("entro");
      return action.payload;
    default:
      return false;
  }
};
