import { ActionTypes } from "../actions/types";

const paginado = {
  paginado: undefined,
  price: undefined,
  amenities: undefined,
  type: undefined,
  guest: undefined,
  score: undefined,
  cities: undefined,
  fechas: undefined,
};

export const statePaginado = (state = paginado, action) => {
  switch (action.type) {
    case ActionTypes.paginado:
      return action.payload;
    default:
      return state;
  }
};
