import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes } from "./types";

export interface fake {
  imagen: string;
  precio: string;
  ciudad: string;
}
export interface FetchUsersAction {
  type: ActionTypes.fetchUsers;
  payload: fake[];
}
export interface data {
  nombre: string;
  id: Number;
}
const url = "http://localhost:3001";

export const fetchUsers = () => {
  console.log("jkjfsdjf");
  return async (dispatch: Dispatch) => {
    const response = await axios.get<fake[]>(url);
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
