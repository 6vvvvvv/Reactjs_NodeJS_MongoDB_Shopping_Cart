import {
  ADD_TO_CART,
  REMOVE_ITEM,
  SUB_QUANTITY,
  ADD_QUANTITY,
  ADD_SHIPPING,
  SUB_SHIPPING,
  SET_LOGSTATUS,
  SET_LOGGEDINUSERNAME,
} from "./action-types/cart-actions";

//Add cart action
export const addToCart = (payload) => {
  return {
    type: ADD_TO_CART,
    payload,
  };
};
//Remove item action
export const removeItem = (payload) => {
  return {
    type: REMOVE_ITEM,
    payload,
  };
};

//Add quantity action
export const addQuantity = (payload) => {
  return {
    type: ADD_QUANTITY,
    payload,
  };
};

//Subtract quantity action
export const subtractQuantity = (payload) => {
  return {
    type: SUB_QUANTITY,
    payload,
  };
};

//Add shipment action
export const addShipping = (payload) => {
  return {
    type: ADD_SHIPPING,
    payload,
  };
};

//Subtract shipment action
export const substractShipping = (payload) => {
  return {
    type: SUB_SHIPPING,
    payload,
  };
};

export const setStatus = (payload) => {
  return {
    type: SET_LOGSTATUS,
    payload,
  };
};

export const setLoginUserName = (payload) => {
  return {
    type: SET_LOGGEDINUSERNAME,
    payload,
  };
};
