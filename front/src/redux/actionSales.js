import axios from "axios";
import { sweetAlertsSuccessfully, sweetAlertsError } from "../components/Utils/alerts/sweetAlerts";
import { GET_SALES, CREATE_SALE } from "./types";
import url from "../config/config";



export const getSalesAction = (id) => {
  return async (dispatch) => {
    try {
      let res = await axios.get(`${url}/api/sale/company/${id}`,);
      dispatch({ type: GET_SALES, payload: res.data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const createSaleAction = (value) => {
  return async (dispatch) => {
    try {
      let res = await axios.post(`${url}/api/sale`, value);
      dispatch({ type: CREATE_SALE, payload: res.data });
      if (res.status !== 201) return sweetAlertsError(res.data.message)

      sweetAlertsSuccessfully(res.data.message)
    } catch (error) {
      console.log(error)
      sweetAlertsError("Something went wrong")
    }
  }
}

export const getSalesCount = async (id) => {
  try {
    let res = await axios.get(`${url}/api/sale/count/${id}`);
    return res.data
  } catch (error) {
    console.log(error)
  }

}