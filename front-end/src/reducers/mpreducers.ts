import { GetUrlmppAction } from "../actions/index";
import { ActionTypes } from "../actions/types";


export interface urlMpp{
    direccion: String,
  }
  

export const mpReducer = (state: urlMpp, action: GetUrlmppAction) => {
  switch (action.type) {
    case ActionTypes.geturlmp:
      console.log("manda url");
      return action.payload;
    default:
      return state;
  }
};