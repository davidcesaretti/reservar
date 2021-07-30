import { StepRegister } from "../actions/index";
import { ActionTypes } from "../actions/types";

export const StepRegisterOne = (state: Object = {}, action: StepRegister) => {
  switch (action.type) {
    case ActionTypes.stateRegister:
      return action.payload;

    default:
      return state;
  }
};
