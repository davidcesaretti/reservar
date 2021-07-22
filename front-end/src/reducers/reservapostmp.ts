
import { ActionTypes } from "../actions/types";
import { PostReservarAction} from "../actions/index";


export const postReserva = (state: Object={}, action: PostReservarAction) => {
  switch (action.type) {
    case ActionTypes.postreservar:
      console.log("");
      return state
    default:
      return state;
  }
};
