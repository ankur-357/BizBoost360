//id usuario: "6580b1c950ad6093befe8ba1"
//id company: "6580b24750ad6093befe8ba3"
import {
  CREATE_PRODUCT,
  GET_ALL_PRODUCTS,
  USER_REGISTER,
  GET_PRODUCT_DETAIL,
  COMPANY_REGISTER,
  USER_LOGIN,
  USER_LOGOUT,
  SORT_BY_PRICE,
  SORT_BY_STOCK,
  SORT_BY_NAME,
  GET_COMPANY,
  EDIT_PRODUCT,
  FILTER_BY_CATEGORY,
  GET_SALES,
  CREATE_SALE,
  USER_REGISTER_STATUS,
  DELETE_PRODUCT,
} from "./types";

const initialState = {
  userRegister: "",

  company: {},
  //TRAE LOS DATOS DEL USUARIO
  user: {},
  //TRAE TODOS LOS PRODUCTOS DE UNA COMPAÑIA
  products: [],
  //COPIA DE PRODUCTS, UTILIZADA PARA LOS FILTROS
  allProducts: [],
  //TRAE EL DETALLE DE UN PRODUCTO POR ID
  productDetail: {},
};
export const reducerCompany = (state = initialState, action) => {
  switch (action.type) {
    case COMPANY_REGISTER:
      return {
        ...state,
        company: action.payload,
      };
    case GET_COMPANY:
      return {
        ...state,
        company: action.payload,
      };
    default:
      return { ...state };
  }
};

export const reducerUsers = (state = initialState, action) => {
  switch (action.type) {
    case USER_REGISTER_STATUS:
      return {
        ...state,
        userRegister: action.payload,
      };
    case USER_REGISTER:
      return {
        ...state,
        user: action.payload,
      };
    case USER_LOGIN:
      return {
        ...state,
        user: action.payload,
      };
    case USER_LOGOUT:
      return {
        ...state,
        user: {},
      };

    default:
      return { ...state };
  }
};

export const reducerProducts = (state = initialState, action) => {
  switch (action.type) {
    //CREACION DE PRODUCTO
    case CREATE_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload],
        allProducts: [...state.allProducts, action.payload],
      };
    //OBTENER TODOS LOS PRODUCTOS DE UNA COMPAÑIA
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        allProducts: action.payload,
      };
    //OBTENER DETALLE DE PRODUCTO
    case GET_PRODUCT_DETAIL:
      //console.log("llego al reducer, con payload: ", action.payload);
      return {
        ...state,
        productDetail: action.payload,
      };
    //ORDEN POR PRECIO
    case SORT_BY_PRICE:
      //console.log("PRODUCTS A SORT: ", state.products);
      //console.log("llega la action al reducer, con action payload: ", action.payload);
      // eslint-disable-next-line no-case-declarations
      let sortArray =
        action.payload === "Asc"
          ? state.products.sort((a, b) => {
            return a.price - b.price;
          })
          : state.products.sort((a, b) => {
            return b.price - a.price;
          });
      //console.log("SORT PRICE HECHO", sortArray);
      return {
        ...state,
        products: [...sortArray], //asigno la referencia de sortArray y no modifico el estado original
      };
    //ORDEN POR STOCK
    case SORT_BY_STOCK:
      // eslint-disable-next-line no-case-declarations
      let sortStockArray =
        action.payload === "Asc"
          ? state.products.sort((a, b) => {
            return a.quantity - b.quantity;
          })
          : state.products.sort((a, b) => {
            return b.quantity - a.quantity;
          });
      //console.log(sortStockArray);
      return {
        ...state,
        products: [...sortStockArray],
      };
    //ORDEN POR NOMBRE
    case SORT_BY_NAME:
      // eslint-disable-next-line no-case-declarations
      let sortNameArray =
        action.payload === 'Asc' ?
          (state.products.sort((a, b) => {
            if (a.name > b.name) { return 1 }
            if (b.name > a.name) { return -1 }
            return 0
          })) :
          (state.products.sort((a, b) => {
            if (b.name > a.name) { return 1 }
            if (a.name > b.name) { return -1 }
            return 0
          }));
      return {
        ...state,
        products: [...sortNameArray]
      };
    //FILTRAR POR CATEGORIA:
    case FILTER_BY_CATEGORY:
      //console.log('entro al reducer, con value: ', action.payload);
      // eslint-disable-next-line no-case-declarations
      const allProducts = state.allProducts;
      // console.log('PRODUCTOS FILTER: ', allProducts);
      // eslint-disable-next-line no-case-declarations
      const filtered =
        action.payload === "all"
          ? allProducts
          : allProducts.filter((product) =>
            product.category.some(category =>
              category.toLowerCase().includes(action.payload.toLowerCase()))
          );
      //console.log('ARRAY FILTRADO:', filtered);
      return {
        ...state,
        products: filtered,
      };

    case EDIT_PRODUCT:
      return {
        ...state,
        products: [
          ...state,
          action.payload.slice(0, action.payload),
          action.payload.slice(action.payload + 1),
        ],
        allProducts: [
          ...state,
          action.payload.slice(0, action.payload),
          action.payload.slice(action.payload + 1),
        ]
      };

    case DELETE_PRODUCT:
      const deleteFiltered = state.products.filter(product => product.id !== action.payload);
      return {
        ...state,
        products: deleteFiltered,
        allProducts: deleteFiltered
      }
    default:
      return { ...state };
  }
};

export const reducerSales = (state = initialState, action) => {
  switch (action.type) {
    case GET_SALES:
      return {
        ...state,
        sales: action.payload,
      }
    case CREATE_SALE:
      return {
        ...state,
        sales: action.payload
      }

    default:
      return { ...state }
  }
}