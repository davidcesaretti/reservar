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

export interface Bookchat {
  type: ActionTypes.bookchat;
  payload: any;
}

export interface Hostres {
  type: ActionTypes.hostres;
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

export interface Collection {
  type: ActionTypes.setCollection;
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

export interface USERFAVS {
  type: ActionTypes.favUser;
  payload: Array<Object>;
}
export interface Reviews {
  type: ActionTypes.review;
  payload: any;
}
export interface Credentials {
  username: string;
  password: string;
}
export interface AllPosts {
  type: ActionTypes.listPosts;
  payload: Array<Object>
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

export interface reserveFaker {
  type: ActionTypes.reserveFake;
  payload: any;
}

export interface listOfLodgings {
  type: ActionTypes.usersList;
  payload: Array<Object>;
}
export interface listOfUsers {
  type: ActionTypes.usersList;
  payload: Array<Object>;
}
export interface listOfCities {
  type: ActionTypes.listCities;
  payload: Array<String>;
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
    return fetch("https://app-trekker.herokuapp.com/upload/find", {
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
      })
      .catch((error) => console.error("Error:", error));
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
      "https://app-trekker.herokuapp.com/register",
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

export const GetPosts = () => {
  return async (dispatch: Dispatch) => {
    const posts = await axios.get("http://localhost:3001/upload/getPosts")
    dispatch<AllPosts>({
      type: ActionTypes.listPosts,
      payload: posts.data
    })
  }
}

export const SetCollection = (data) => {
  return async (dispatch: Dispatch) => {
    dispatch<Collection>({
      type: ActionTypes.setCollection,
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
      const updatedUser = await axios.post(
        "https://app-trekker.herokuapp.com/register",
        {
          userInfo,
          userEmail,
        }
      );
      console.log(userInfo);
    } catch (err) {
      console.error(err);
    }
  };
};

export const getUserInfo = (email) => {
  return async (dispatch: Dispatch) => {
    try {
      const infoUser = await axios.post(
        "https://app-trekker.herokuapp.com/login",
        {
          email,
        }
      );

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
      const list = await axios.get(
        "http://localhost:3001/userList"
      );
      dispatch<listOfUsers>({
        type: ActionTypes.usersList,
        payload: list.data,
      });
    } catch (err) {
      console.error(err);
    }
  };
};

export const getLodgingList = () => {
  return async (dispatch: Dispatch) => {
    try {
      const list = await axios.get(
        "http://localhost:3001/admin/getprops"
      );
      dispatch({
        type: ActionTypes.lodgingUser,
        payload: list.data,
      });
    } catch (err) {
      console.error(err);
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
    if (data.favorites?.length < 0) {
    } else {
      let favs = {
        favorites: data.favos,
        email: data.email,
      };
      dispatch<Favourites>({
        type: ActionTypes.addFav,
        payload: data,
      });
      const newFavs = await axios.post(
        "https://app-trekker.herokuapp.com/favorites",
        favs
      );
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
    let user = {
      email: data,
    };
    const favUsers = await axios.post(
      "https://app-trekker.herokuapp.com/getfavorites",
      user
    );

    dispatch({ type: ActionTypes.favUser, payload: favUsers.data });
  };
};

export const getBooking = (data) => {
  return async (dispatch: Dispatch) => {
    let user = {
      email: data,
    };

    const bookingUsers = await axios.post(
      "https://app-trekker.herokuapp.com/bookchat2",
      user
    );

    const nuevo2 = [];
    const obj = {
      flag: "false",
    };
    bookingUsers.data.map((e) =>
      axios
        .get(`https://app-trekker.herokuapp.com/filter/properties/${e.Prop_id}`)
        .then((res) => {
          const nuevo = Object.assign(e, res.data[0]);

          if (e.state === "approved") {
            Object.assign(nuevo, obj);
          }
          nuevo2.push(nuevo);
        })
    );
    setTimeout(() => {
      dispatch({ type: ActionTypes.bookings, payload: nuevo2 });
    }, 5000);
  };
};

export const getBookChat = (data) => {
  return async (dispatch: Dispatch) => {
    let user = {
      email: data,
    };

    const bookchat = await axios.post(
      "https://app-trekker.herokuapp.com/bookchat",
      user
    );

    dispatch({ type: ActionTypes.bookchat, payload: bookchat.data });
  };
};

export const getHostReserves = (data) => {
  return async (dispatch: Dispatch) => {
    let user = {
      email: data,
    };
    const hostres = await axios.post(
      "https://app-trekker.herokuapp.com/gethostreserves",
      user
    );

    dispatch({ type: ActionTypes.hostres, payload: hostres.data });
  };
};

export const postReserve = (obj) => {
  return async (dispatch: Dispatch) => {
    await axios.post("https://app-trekker.herokuapp.com/reserva", obj);
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
    console.log("verificacion ", email);
    const code = await axios.post(
      "https://app-trekker.herokuapp.com/validateadmin",
      {
        email,
      }
    );

    dispatch<validationAdmin>({
      type: ActionTypes.validateAdmin,
      payload: code.data,
    });
  };
};
export const reservefake = (id) => {
  return async (dispatch: Dispatch) => {
    const response = await axios.get(
      `https://app-trekker.herokuapp.com/selectDates?Prop_id=${id}`
    );
    dispatch<reserveFaker>({
      type: ActionTypes.reserveFake,
      payload: response.data,
    });
  };
};

export const addreview = (review) => {
  return async (dispatch: Dispatch) => {
    await axios.post(`https://app-trekker.herokuapp.com/review`, review);
  };
};

export const getListOfCities = () => {
  return async (dispatch: Dispatch) => {
    try {
      const list = await axios.get(
        "http://localhost:3001/filter/cities" 
      );
      dispatch<listOfCities>({
        type: ActionTypes.listCities,
        payload: list.data,
      });
    } catch (err) {
      console.error(err);
    }
  };
};
