import axios from "axios";
import {
  CREATE_PRODUCT,
  GET_ALL_PRODUCTS,
  GET_PRODUCT_DETAIL,
  SORT_BY_PRICE,
  SORT_BY_STOCK,
  EDIT_PRODUCT,
  FILTER_BY_CATEGORY,
  SORT_BY_NAME,
  DELETE_PRODUCT,
} from "./types";

import url from "../config/config";
import {
  sweetAlertsSuccessfully,
  sweetAlertsError,
} from "../components/Utils/alerts/sweetAlerts";

export const createProductAction = (values) => {
  console.log(values)
  return async (dispatch) => {
    try {
      console.log(dispatch)
      let res = await axios.post(`${url}/api/product`, values);
      dispatch({ type: CREATE_PRODUCT, payload: res.data });
      sweetAlertsSuccessfully("Felicidades", res.data.message, "Ok");
    } catch (error) {
      console.log(error);
      sweetAlertsError(
        "Uh...try again",
        "We couldn't create the new product",
        "Ok"
      );
    }
  };
};

export const getAllProductsAction = (companyId) => {
  return async (dispatch) => {
    try {
      const bddData = await axios.get(`${url}/api/products/${companyId}`);
      const products = bddData.data;  // Renamed from allProducts to products
      dispatch({
        type: GET_ALL_PRODUCTS,
        payload: products  // Updated payload name
      });
    } catch (error) {
      console.log(error.message);
      sweetAlertsError(
        "Uh...try again",
        "We cannot show your products",
        "Ok"
      );
    }
  }
};



export const getProductDetailAction = (detailId, companyId) => {

  return async (dispatch) => {
    try {
      const bddData = await axios.get(`${url}/api/product/${detailId}/${companyId}`);
      //console.log("getAxios: ", bddData);
      const product = bddData.data;
      dispatch({
        type: GET_PRODUCT_DETAIL,
        payload: product
      })
    } catch (error) {
      console.log(error.message);
      sweetAlertsError(
        "Uh...try again",
        "We cannot show your product",
        "Ok"
      );
    }
  }
}
export const sortByPriceAction = (value) => {
  //console.log("llega a la action con value: ", value);
  //console.log('envio la action al reducer');
  return {
    type: SORT_BY_PRICE,
    payload: value
  }
};

export const sortByStockAction = (value) => {
  return {
    type: SORT_BY_STOCK,
    payload: value,
  };
};

export const sortByNameAction = (value) => {
  return {
    type: SORT_BY_NAME,
    payload: value,
  };
};

export const editProductAction = (id, values) => {
  return async (dispatch) => {
    try {
      let res = await axios.put(`${url}/api/product/${id}`, values);
      dispatch({ type: EDIT_PRODUCT, payload: res.data });
      sweetAlertsSuccessfully("Updated Product", res.data.message, "Ok");
    } catch (error) {
      console.log(error);
      sweetAlertsError(
        "Uh... try again",
        "We couldn't edit the product",
        "Ok"
      );
    }
  };
}

export const filterByCategoryAction = (value) => {
  return {
    type: FILTER_BY_CATEGORY,
    payload: value
  }
}

export const deleteProductAction = (productId) => {
  console.log("Product ID received: ", productId);
  return async (dispatch) => {
    try {
      let res = await axios.delete(`${url}/api/product/${productId}`);
      dispatch({ type: DELETE_PRODUCT, payload: productId });
      sweetAlertsSuccessfully("Congratulations", res.data.message, "Ok");
    } catch (error) {
      //console.log("ERROR", error);
      sweetAlertsError(
        "Uh... try again",
        "We could not remove the product",
        "Ok"
      );
    }
  };
};
