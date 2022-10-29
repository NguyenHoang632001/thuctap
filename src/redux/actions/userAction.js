import { login, loginWithOTP, LogOut } from "../../services/userService";

import * as actions from "../constants";

export const handleUserLogin = (email, password) => {
  return async (dispatch) => {
    try {
      let res = await login({ email, password });
      if (res && res.errCode === 0) {
        dispatch({ type: actions.USER_LOGIN_SUCCESS, payload: res });
      } else {
        dispatch({ type: actions.USER_LOGIN_FAILED });
      }
    } catch (error) {
      dispatch({ type: actions.USER_LOGIN_FAILED });
      console.log(error);
    }
  };
};

export const handleUserLogout = (id) => {
  return async (dispatch) => {
    try {
      let res = await LogOut({ id });
      if (res && res.errCode === 0) {
        dispatch({ type: actions.USER_LOGOUT_SUCCESS });
      } else {
        dispatch({ type: actions.USER_LOGOUT_FAILED });
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: actions.USER_LOGOUT_FAILED });
    }
  };
};

export const handleUserLoginWithOTP = (userEmail, OTP) => {
  return async (dispatch) => {
    try {
      let res = await loginWithOTP({ userEmail, OTP });
      console.log(res);
      if (res && res.errCode === 0) {
        dispatch({ type: actions.USER_LOGIN_SUCCESS, payload: res });
      } else {
        dispatch({ type: actions.USER_LOGIN_FAILED });
      }
    } catch (error) {
      dispatch({ type: actions.USER_LOGIN_FAILED });
      console.log(error);
    }
  };
};
