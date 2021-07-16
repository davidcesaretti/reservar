import { usersLoggedRed } from "./userlogged";
import { combineReducers } from "redux";
import { usersReducer } from "./users";
import { signedReducer } from "./signed";
import { fake } from "../actions";
import { cardsHotel, hotelsReducer } from "./hotels";
import { detailReducer } from "./detail";
import { fechasReducer } from "./fechas";

export interface StoreState {
  fechas: any;
  users: fake[];
  cardsHotel: cardsHotel[];
  signed: boolean;
  userlogged: string;
  categorieDetail: cardsHotel[];
}

export const reducers = combineReducers<StoreState>({
  fechas: fechasReducer,
  users: usersReducer,
  cardsHotel: hotelsReducer,
  signed: signedReducer,
  userlogged: usersLoggedRed,
  categorieDetail: detailReducer,
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
