import {
  ADD_TO_CART,
  REMOVE_ITEM,
  SUB_QUANTITY,
  ADD_QUANTITY,
  ADD_SHIPPING,
  SUB_SHIPPING
} from "./action-types/cart-actions";

//Add cart action
export const addToCart = id => {
  return {
    type: ADD_TO_CART,
    id
  };
};
//Remove item action
export const removeItem = id => {
  return {
    type: REMOVE_ITEM,
    id
  };
};

//Add quantity action
export const addQuantity = id => {
  return {
    type: ADD_QUANTITY,
    id
  };
};

//Subtract quantity action
export const subtractQuantity = id => {
  return {
    type: SUB_QUANTITY,
    id
  };
};

//Add shipment action
export const addShipping = id => {
  return {
    type: ADD_SHIPPING,
    id
  };
};

//Subtract shipment action
export const substractShipping = id => {
  return {
    type: SUB_SHIPPING,
    id
  };
};
