import { SignedInUser } from "../actions/index";
import { ActionTypes } from "../actions/types";


export const signedReducer = (state: boolean = false, action: SignedInUser) => {
    switch (action.type) {
    case ActionTypes.signUser:
        console.log("entro");
        return !state;
    default:
        return state;
    }
};
