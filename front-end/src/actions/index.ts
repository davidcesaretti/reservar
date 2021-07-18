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
export interface Booleano {
  type: ActionTypes.booleanState;
  payload: boolean;
}

export interface UserEmail {
  type: ActionTypes.usersLogged;
  payload: string;
}
export interface Favourites {
  type: ActionTypes.addFav;
  payload: any;
}
export interface USERFAVS {
  type: ActionTypes.favUser;
  payload: any;
}
export interface Credentials {
  username: string;
  password: string;
}
export interface userInfo {
  name: string;
  email: string;
  phone: number;
  dcmType: string;
  dcmNumber: number;
  nationality: string;
  birthday: string;
  adress: string;
  residence: string;
  emergencyPhone: number;
  recoveryMail: string;
  civilStatus: string;
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
  score,
  city,
  fecha
) => {
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
  }&${city !== undefined ? `city=${city}` : "nada"}`;

  string1 = string1.split(",").join("");

  return async (dispatch: Dispatch) => {
    const response = await axios.post<cardsHotel[]>(url + string1, fecha);
    dispatch<FetchCardsHotelAction>({
      type: ActionTypes.fetchCardsHotels,
      payload: response.data,
    });
  };
};
export function postRaza(data) {
  return function (dispatch) {
    return fetch("https://dogs-breeds-jesus.herokuapp.com/dog", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((json) => {
        dispatch({ type: "POST_RAZA", payload: json });
      });
  };
}
export const signUser = (data) => {
  return async (dispatch: Dispatch) => {
    let userInfo = {
      email: data.email,
      name: data.name,
      photo: data.photo,
    };
    const newUser = await axios.post(
      "http://localhost:3001/register",
      userInfo
    );

    dispatch<SignedInUser>({
      type: ActionTypes.signUser,
      payload: false,
    });
  };
};

export const UserEmailGlobal = (data) => {
  return async (dispatch: Dispatch) => {
    dispatch<UserEmail>({
      type: ActionTypes.usersLogged,
      payload: data,
    });
  };
};
export const FechasReserva = (data: Object) => {
  return {
    type: ActionTypes.calendary,
    payload: data,
  };
};
export const detailHotel = (id) => {
  return async (dispatch: Dispatch) => {
    const response = await axios.get<cardsHotel[]>(
      `${url}/filter/properties/${id}`
    );
    dispatch<FetchDetailHotel>({
      type: ActionTypes.detailHotel,
      payload: response.data,
    });
  };
};
export const updateUser = (userInfo: object, userEmail) => {
  return async (dispatch: Dispatch) => {
    try {
      const updatedUser = await axios.post("http://localhost:3001/register", {
        userInfo,
        userEmail,
      });
      console.log(userInfo);
    } catch (e) {
      console.error(e);
    }
  };
};

export const clearDetail = () => {
  return {
    type: ActionTypes.detailHotel,
    payload: [],
  };
};

export const addFavourites = (data) => {
  return async (dispatch: Dispatch) => {
    console.log("Dispatch favourites", data);
    let favs = {
      favorites: data.favos,
      email: data.email,
    };
    dispatch<Favourites>({
      type: ActionTypes.addFav,
      payload: data,
    });
    const newFavs = await axios.put("http://localhost:3001/favorites", favs);
  };
};

export const setBoolean = (data) => {
  return async (dispatch: Dispatch) => {
    dispatch<Booleano>({
      type: ActionTypes.booleanState,
      payload: data,
    });
  };
};

export const getFavos = (data) => {
  return async (dispatch: Dispatch) => {
    console.log(data, "   DATA");
    let user = {
      email: data,
    };
    const favUsers = await axios.post(
      "http://localhost:3001/getfavorites",
      user
    );
    console.log(favUsers, "    FAV USERS");

    dispatch({ type: ActionTypes.favUser, payload: favUsers.data });
  };
};

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
