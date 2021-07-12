import { combineReducers } from "redux";
import { usersReducer} from "./users";
import { signedReducer } from "./signed"
import { fake } from "../actions";
import { cardsHotel, hotelsReducer } from './hotels';


export interface StoreState {
  users: fake[];
  cardsHotel: cardsHotel[];
  signed: boolean;
}
 
export const reducers = combineReducers<StoreState>({
  users: usersReducer,
  cardsHotel: hotelsReducer,
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
