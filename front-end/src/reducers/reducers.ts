import { Favourites } from "./../actions/index";
import { favReducer } from "./favReducer";
import { usersLoggedRed } from "./userlogged";
import { combineReducers } from "redux";
import { usersReducer } from "./users";
import { signedReducer } from "./signed";
import { fake } from "../actions";
import { cardsHotel, hotelsReducer } from "./hotels";
import { detailReducer } from "./detail";

export interface StoreState {
  users: fake[];
  cardsHotel: cardsHotel[];
  signed: boolean;
  userlogged: string;
  categorieDetail: cardsHotel[];
  favourites: Favourites[];
}

export const reducers = combineReducers<StoreState>({
  users: usersReducer,
  cardsHotel: hotelsReducer,
  signed: signedReducer,
  userlogged: usersLoggedRed,
  categorieDetail: detailReducer,
  favourites: favReducer,
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
