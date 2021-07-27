import { hostresRed } from "./hostres";
import { bookchatRed } from "./bookchat";
import { booleanoRed } from "./booleano";
import { Favourites, Booleano, USERFAVS } from "./../actions/index";
import { favReducer } from "./favReducer";
import { usersLoggedRed } from "./userlogged";
import { combineReducers } from "redux";
import { usersReducer } from "./users";
import { signedReducer } from "./signed";
import { fake } from "../actions";
import { cardsHotel, hotelsReducer } from "./hotels";
import { detailReducer } from "./detail";
import { fechasReducer } from "./fechas";
import { userFavReducer } from "./userFavs";
import { StepRegisterOne } from "./reserve";
import { reservesReducer } from "./reserves";
import { postsHost } from "./postUser";
import { userInfo } from "./infoUser";
import { statePaginado } from "./paginado";

export interface StoreState {
  fechas: any;
  users: fake[];
  cardsHotel: cardsHotel[];
  signed: boolean;
  userlogged: string;
  categorieDetail: cardsHotel[];
  favourites: Favourites;
  booleanState: boolean;
  userfavossss: Array<any>;
  stateRegister: any;
  bookings: Array<any>;
  postHost: Array<any>;
  user: Object;
  paginado: Object;
  bookchat: Array<any>;
  hostres: Array<any>;
}

export const reducers = combineReducers<StoreState>({
  fechas: fechasReducer,
  users: usersReducer,
  cardsHotel: hotelsReducer,
  signed: signedReducer,
  userlogged: usersLoggedRed,
  categorieDetail: detailReducer,
  favourites: favReducer,
  booleanState: booleanoRed,
  userfavossss: userFavReducer,
  stateRegister: StepRegisterOne,
  bookings: reservesReducer,
  postHost: postsHost,
  user: userInfo,
  paginado: statePaginado,
  bookchat: bookchatRed,
  hostres: hostresRed,
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
