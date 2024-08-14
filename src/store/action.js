import { SET_USER } from "./actions";

// Action creator to set user data
export const setUser = (user) => ({
    type: SET_USER,
    payload: user
  });