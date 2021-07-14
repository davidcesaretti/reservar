import { combineReducers } from "redux";
import { usersReducer} from "./users";
import { signedReducer } from "./signed"
import { fake } from "../actions";
import { cardsHotel, hotelsReducer } from './hotels';
import { detailReducer } from './detail';

export interface StoreState {
  users: fake[];
  cardsHotel: cardsHotel[];
  signed: boolean;
  categorieDetail: cardsHotel[];
}
 
export const reducers = combineReducers<StoreState>({
  users: usersReducer,
  cardsHotel: hotelsReducer,
  signed: signedReducer,
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
