import { cardsHotel } from "./../reducers/hotels";
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
export interface FetchCardsHotelAction {
  type: ActionTypes.fetchCardsHotels;
  payload: cardsHotel[];
}
export interface FetchDetailHotel {
  type: ActionTypes.detailHotel;
  payload: cardsHotel[];
}
export interface data {
  nombre: string;
  id: Number;
}

export interface SignedInUser {
  type: ActionTypes.signUser;
  payload: boolean;
}

export interface UserEmail {
  type: ActionTypes.usersLogged;
  payload: string;
}
export interface Credentials {
  username: string;
  password: string;
}
const url = "http://localhost:3001";

export const onLogin = async (data: Credentials) => {
  const requestConfig: AxiosRequestConfig = {
    method: "post",
    url: process.env.BASE_URL + "/login",
    data,
  };
  try {
    const { data: response } = await axios.request(requestConfig);
  } catch (e) {
    console.error(e);
    return { error: e.response.data.message };
  }
};

export const fetchUsers = () => {
  return async (dispatch: Dispatch) => {
    const response = await axios.get<fake[]>(url);
    dispatch<FetchUsersAction>({
      type: ActionTypes.fetchUsers,
      payload: response.data,
    });
  };
};

export const fetchCardsHotels = (
  page,
  price,
  amenities,
  type,
  accommodates,
  score
) => {
  console.log(amenities);

  let string1 = `/filter?page=${page}&${
    score !== undefined ? `score=${score}` : "nada"
  }&${accommodates !== undefined ? `accommodates=${accommodates}` : "nada"}&${
    Array.isArray(amenities)
      ? amenities.map((x) => `amenities=${x}&`)
      : amenities !== undefined
      ? `amenities=${amenities}&`
      : "nada"
  }${price !== undefined ? `price=${price}` : "nada"}&${
    type !== undefined ? `type=${type}` : "nada"
  }`;

  string1 = string1.split(",").join("");

  return async (dispatch: Dispatch) => {
    const response = await axios.get<cardsHotel[]>(url + string1);
    dispatch<FetchCardsHotelAction>({
      type: ActionTypes.fetchCardsHotels,
      payload: response.data,
    });
  };
};
export const signUser = (data) => {
  return async (dispatch: Dispatch) => {
    console.log("action " + data);
    let userInfo = {
      email: data.email,
      name: data.name,
      photo: data.photo,
    };
    const newUser = await axios.post(
      "http://localhost:3001/register",
      userInfo
    );
    console.log(newUser, "new user");
    dispatch<SignedInUser>({
      type: ActionTypes.signUser,
      payload: false,
    });
  };
};

export const UserEmailGlobal = (data) => {
  return async (dispatch: Dispatch) => {
    console.log("Dispatch data email", data);
    dispatch<UserEmail>({
      type: ActionTypes.usersLogged,
      payload: data,
    });
  };
};

export const detailHotel = (id) => {
  return async (dispatch: Dispatch) => {
    const response = await axios.get<cardsHotel[]>(`${url}/filter/properties/${id}`);
    dispatch<FetchDetailHotel>({
      type: ActionTypes.detailHotel,
      payload: response.data,
    })
  }
}

export const clearDetail = () => {
  return {
      type: ActionTypes.detailHotel,
      payload: []
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
