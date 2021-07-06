import { FetchUsersAction } from "./index";

export enum ActionTypes {
  fetchUsers,
  deleteUsers,
}

export type Action = FetchUsersAction;
