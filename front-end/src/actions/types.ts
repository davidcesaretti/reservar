import { FetchUsersAction } from "./index";

export enum ActionTypes {
  fetchUsers,
  deleteUsers,
  fetchCardsHotels,
  signUser,
  usersLogged,
  detailHotel,
  updateUser,
  
}

export type Action = FetchUsersAction;
