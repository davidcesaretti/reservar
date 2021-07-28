import { reserveFaker } from "../actions/index";
import { ActionTypes } from "../actions/types";

export function getReserveFake (state: Array<any> = [], action:reserveFaker){
    switch (action.type) {
        case ActionTypes.reserveFake:
          return action.payload;
    
        default:
          return state;
      }
}