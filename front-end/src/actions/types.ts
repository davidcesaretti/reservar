import { FetchUsersAction } from "./index";

export enum ActionTypes {
  fetchUsers,
  deleteUsers,
  fetchCardsHotels,
  signUser,
  usersLogged,
  detailHotel,
  calendary,
  updateUser,

  addFav,
  booleanState,
}

export type Action = FetchUsersAction;
