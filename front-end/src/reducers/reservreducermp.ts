import { GetReservarAction} from "../actions/index";
import { ActionTypes } from "../actions/types";


export interface stateRegister{
    Prop_id: string,
    fechaSalida: Date, 
    fechaLlegada:Date,
    email: string,
    guests: number,
  }
  
export const getReserva = (state: Object={}, action: GetReservarAction) => {
  switch (action.type) {
    case ActionTypes.getreservar:
      console.log("");
      return action.payload;
    default:
      return state;
  }
};
