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
export interface Bookings {
  type: ActionTypes.bookings;
  payload: any;
}
export interface StepRegister {
  type: ActionTypes.stateRegister;
  payload: any;
}

export interface UserEmail {
  type: ActionTypes.usersLogged;
  payload: string;
}
export interface Favourites {
  type: ActionTypes.addFav;
  payload: any;
}
export interface userInformation {
  type: ActionTypes.userInfo;
  payload: Object;
}
export interface listOfUsers {
  type: ActionTypes.usersList;
  payload: Array<Object>;
}
export interface USERFAVS {
  type: ActionTypes.favUser;
  payload: Array<Object>;
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

export interface validationAdmin {
  type: ActionTypes.validateAdmin;
  payload: Number;
}
const url = "https://app-trekker.herokuapp.com";

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
  // console.log(amenities);
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
export function findPost(data) {
  return function (dispatch) {
    return fetch("http://localhost:3001/upload/find", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((json) => {
        dispatch({ type: ActionTypes?.findPost, payload: json });
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
    console.log("Registrando", userInfo);

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
export const BotonesPaginado = (data: Object) => {
  return {
    type: ActionTypes.paginado,
    payload: data,
  };
};
export const detailHotel = (id) => {
  return async (dispatch: Dispatch) => {
    dispatch<FetchDetailHotel>({
      type: ActionTypes.detailHotel,
      payload: [],
    });
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
    } catch (err) {
      console.error(err);
    }
  };
};

export const getUserInfo = (email) => {
  return async (dispatch: Dispatch) => {
    try {
      console.log(email);
      const infoUser = await axios.post("http://localhost:3001/login", {
        email,
      });
      console.log("action getUserInfo", infoUser);
      dispatch<userInformation>({
        type: ActionTypes.userInfo,
        payload: infoUser.data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const getUsersList = () => {
  return async (dispatch: Dispatch) => {
    try {
      const list = await axios.get("http://localhost:3001/userList")
      dispatch<listOfUsers>({
        type: ActionTypes.usersList,
        payload: list.data
      })
    } catch (err) {
      console.error(err)
    }
  }
}

export const clearDetail = () => {
  return {
    type: ActionTypes.detailHotel,
    payload: [],
  };
};

export const addFavourites = (data) => {
  return async (dispatch: Dispatch) => {
    if (data.favorites?.length < 0) {
      console.log("ERROR NO FAVO");
    } else {
      console.log("Dispatch favourites", data);
      let favs = {
        favorites: data.favos,
        email: data.email,
      };
      dispatch<Favourites>({
        type: ActionTypes.addFav,
        payload: data,
      });
      const newFavs = await axios.post("http://localhost:3001/favorites", favs);
    }
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
    console.log(favUsers.data, "    FAV USERS");

    dispatch({ type: ActionTypes.favUser, payload: favUsers.data });
  };
};

export const getBooking = (data) => {
  return async (dispatch: Dispatch) => {
    let user = {
      email: data,
    };
    console.log("ENTRO ACCION");
    const bookingUsers = await axios.post(
      "http://localhost:3001/getreserves",
      user
    );

    console.log(bookingUsers, "    RESPUESTA");
    dispatch({ type: ActionTypes.bookings, payload: bookingUsers.data });
  };
};

export const postReserve = (obj) => {
  return async (dispatch: Dispatch) => {
    await axios.post("http://localhost:3001/reserva", obj);
  };
};

export const FirstStepReserve = (obj) => {
  return async (dispatch: Dispatch) => {
    dispatch<StepRegister>({
      type: ActionTypes.stateRegister,
      payload: obj,
    });
  };
};

export const getCodeValidation = (email) => {
  return async (dispatch: Dispatch) => {
    console.log('verificacion ',email)
    const code = await axios.post("http://localhost:3001/validateadmin", {email})

    dispatch<validationAdmin>({
              type: ActionTypes.validateAdmin,
              payload: code.data
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
