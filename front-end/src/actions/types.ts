import { FetchUsersAction } from "./index";

export enum ActionTypes {
  fetchUsers,
  deleteUsers,
  fetchCardsHotels,
  signUser,
  usersLogged,
  detailHotel,
  calendary,
  addFav,
  booleanState,
  updateUser,
  favUser,
  stateRegister
}

export type Action = FetchUsersAction;
