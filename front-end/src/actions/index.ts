
import axios, { AxiosRequestConfig } from "axios";
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

export interface SignedInUser {
  type: ActionTypes.signUser;
}
export interface Credentials {
    username: string,
    password: string,
}
const url = "http://localhost:3001";


export const onLogin = async (data: Credentials) => {
    const requestConfig: AxiosRequestConfig = {
        method: 'post',
        url: process.env.BASE_URL + '/login',
        data
    }
    try{
        const {data: response} = await axios.request(requestConfig)
    } catch (e) {
        console.error(e)
        return {error: e.response.data.message}
    }
}

export const fetchUsers = () => {
  return async (dispatch: Dispatch) => {
    const response = await axios.get<fake[]>(url);
    dispatch<FetchUsersAction>({
      type: ActionTypes.fetchUsers,
      payload: response.data,
    });
  };
};

export const signUser = () => {
  return async (dispatch: Dispatch) => {
    dispatch<SignedInUser>({
      type: ActionTypes.signUser
    })
  }
}

// export function deleteUsers(data: any) {
//   return function (dispatch: Dispatch) {
//     return fetch(url, {
//       method: "DELETE",
//       body: JSON.stringify(data),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     }).then((res) => res.json());
//   };
// }
