import { FetchUsersAction } from "./index";

export enum ActionTypes {
  fetchUsers,
  deleteUsers,
  signUser,

}

export type Action = FetchUsersAction;
