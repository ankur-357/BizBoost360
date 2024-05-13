import axios from "axios";
import {
  USER_LOGOUT,
  USER_REGISTER,
  USER_LOGIN,
  USER_REGISTER_STATUS,
} from "./types.js";

import {
  sweetAlertsSuccessfully,
  sweetAlertsError,
} from "../components/Utils/alerts/sweetAlerts";
import url from "../config/config";

export const userRegisterAction = (values) => {
  const getStatus = () => ({ type: USER_REGISTER_STATUS, payload: "true" });
  return async (dispatch) => {
    try {
      let res = await axios.post(`${url}/api/register`, values);
      dispatch({ type: USER_REGISTER, payload: res.data.user });
      dispatch(getStatus());
      sweetAlertsSuccessfully(
        `Registration of ${values.name} successful!`,
        "Now let's register your company",
        "Ok"
      );
      return res.data
    } catch (error) {

      dispatch({
        type: USER_REGISTER_STATUS,
        payload: error.response.data.success,
      });
      sweetAlertsError(error.response.data.message, "Email is already in use", "OK");
    }
  };
};

export const userLoginAction = (values) => {
  return async (dispatch) => {
    try {
      let res = await axios.post(`${url}/api/login`, values);
      dispatch({ type: USER_LOGIN, payload: res.data });
      sweetAlertsSuccessfully(
        `Successful login`,
        `Welcome ${res.data.name}`,
        "Ok"
      );
      return res
    } catch (error) {
      console.log(error);
      sweetAlertsError(error.response.data.message, "Try again", "OK");
    }
  };
};
export const userLogoutAction = () => {
  return async (dispatch) => {
    try {
      let res = await axios.post(`${url}/api/logout`);
      dispatch({ type: USER_LOGOUT, payload: res });
      sweetAlertsSuccessfully(`See you soon!`, "Remember to come back");
    } catch (error) {
      console.log(error);
      sweetAlertsError(error.response.data.message, "Try again", "OK");
    }
  };
};


export const verifyToken = async () => {
  try {
    let res = await axios.get(`${url}/api/verify`)
    return res
  } catch (error) {
    console.log(error)
    sweetAlertsError(error.response.data.message, "Try again", "OK")
  }
}

export const registerEUA = async (data) => {
  try {
    let res = await axios.post(`${url}/api/register`, data);
    return res
  } catch (error) {
    sweetAlertsError("Error", error.response.data.message, "Ok")
  }
}

export const deleteUser = async (id) => {
  try {
    const res = await axios.delete(`${url}/api/user/${id}`)
    sweetAlertsSuccessfully("User Deleted", `${res.data} Removed`);
    return res
  } catch (error) {
    sweetAlertsError("Error", error.response.data.message, "Ok")
  }
}