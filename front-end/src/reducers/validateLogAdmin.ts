import { getCodeValidation, validationAdmin } from "../actions";
import { ActionTypes } from "../actions/types";

export const validateLogAdmin = (state: Number = 0, action: validationAdmin) => {
  switch (action.type) {
    case ActionTypes.validateAdmin:
      return action.payload;
    default:
      return state;
  }
};