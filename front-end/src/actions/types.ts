import { FetchUsersAction } from "./index";

export enum ActionTypes {
  fetchUsers,
  deleteUsers,
  fetchCardsHotels,
}

export type Action = FetchUsersAction;
