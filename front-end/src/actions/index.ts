import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes } from "./types";

export interface User {
  id: number;
  name: string;
  lastName: string;
}
export interface FetchUsersAction {
  type: ActionTypes.fetchUsers;
  payload: User[];
}
export interface data {
  nombre: string;
  id: Number;
}
const url = "http://localhost:3001/api/user";

export const fetchUsers = () => {
  return async (dispatch: Dispatch) => {
    const response = await axios.get<User[]>(url);
    dispatch<FetchUsersAction>({
      type: ActionTypes.fetchUsers,
      payload: response.data,
    });
  };
};

export function deleteUsers(data: any) {
  return function (dispatch: Dispatch) {
    return fetch(url, {
      method: "DELETE",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  };
}
