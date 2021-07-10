import { combineReducers } from "redux";
import { usersReducer} from "./users";
import { signedReducer } from "./signed"
import { fake } from "../actions";

export interface StoreState {
  users: fake[];
  signed: boolean;
}

export const reducers = combineReducers<StoreState>({
  users: usersReducer,
  signed: signedReducer,
});

export default reducers;
// interface stateI {
//   counter: number;
// }

// const initialState: stateI = {
//   counter: 1,
// };

// interface actionI {
//   type: string;
// }

// export default function reducer(state: stateI = initialState, action: actionI) {
//   return state;
// }
