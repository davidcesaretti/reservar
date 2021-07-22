import { GetUrlmppAction } from "../actions/index";
import { ActionTypes } from "../actions/types";


export interface storeMpp{
  Prop_id: string,
  fechaSalida: Date, 
  fechaLlegada:Date,
  email: string,
  guests: number,
  }
  
export const mpReducer = (state: Object={}, action: GetUrlmppAction) => {
  switch (action.type) {
    case ActionTypes.geturlmp:
      console.log("manda url");
      return action.payload;
    default:
      return state;
  }
};