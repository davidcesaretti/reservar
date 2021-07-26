import { StepRegister } from "../actions/index";
import { ActionTypes } from "../actions/types";

export const StepRegisterOne = (state: Object = {}, action: StepRegister) => {
  switch (action.type) {
    case ActionTypes.stateRegister:
      console.log("mando data a store");
      return action.payload;

    default:
      return state;
  }
};
