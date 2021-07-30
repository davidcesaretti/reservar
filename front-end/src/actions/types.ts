import { FetchUsersAction } from "./index";

export enum ActionTypes {
  fetchUsers = "FETCH_USERS",
  deleteUsers = "DELETE_USERS",
  fetchCardsHotels = "FETCH_CARDS_HOTELS",
  signUser = "SIGN_USERS",
  usersLogged = "USERS_LOGGED",
  detailHotel = "DETAIL_HOTEL",
  calendary = "CALENDARY",
  addFav = "ADD_FAV",
  booleanState = "BOOLEAN_STATE",
  updateUser = "UPDATE_USER",
  favUser = "FAV_USER",
  bookings = "BOOKINGS",
  bookchat = "BOOK_CHAT",
  stateRegister = "STATE_REGISTER",
  findPost = "FIND_POST",
  userInfo = "USER_INFO",
  paginado = "PAGINADO",
  hostres = "HOST_RES",
  setCollection = "SET_COLLECTION",
  usersList = "LIST_OF_USERS",
  validateAdmin = "VALIDATION_CODE",
  reserveFake = "RESERVE_FAKE",
  review = "REVIEW"
}

export type Action = FetchUsersAction;
