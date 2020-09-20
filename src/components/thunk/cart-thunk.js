import axios from "axios";
import {
  addToCart,
  removeItem,
  addQuantity,
  subtractQuantity,
  addShipping,
  substractShipping,
} from "../actions/cartActions";

//ADD_TO_CART
export const add_item_toback = (payload) => {
  return (dispatch, getState) => {
    console.log("payload", payload);
    // const userinfo = JSON.parse(localStorage.getItem("user"));
    // const token = userinfo.token;
    axios
      .post(
        "http://localhost:4000/user/additem",
        {
          item: payload.item,
          email: payload.useremail,
        },
        {
          headers: {
            "Content-Type": "application/json",
            // authorization: `${token}`,
          },
        }
      )
      .then((res) => {
        console.log("add_item_toback", res.data);
        dispatch(addToCart(res.data));
      });
  };
};

//REMOVE_ITEM
export const remove_item_fromback = (payload) => {
  return (dispatch, getState) => {
    console.log("payload", payload);
    // const userinfo = JSON.parse(localStorage.getItem("user"));
    // const token = userinfo.token;
    axios
      .post(
        "http://localhost:4000/user/removeitem",
        {
          item: payload.item,
          email: payload.useremail,
        },
        {
          headers: {
            "Content-Type": "application/json",
            // authorization: `${token}`,
          },
        }
      )
      .then((res) => {
        console.log("remove_item_fromback", res.data);
        dispatch(removeItem(res.data));
      });
  };
};

//ADD_QUANTITY
export const add_quantity = (payload) => {
  return (dispatch, getState) => {
    console.log("payload", payload);
    // const userinfo = JSON.parse(localStorage.getItem("user"));
    // const token = userinfo.token;
    axios
      .post(
        "http://localhost:4000/user/addquantity",
        {
          item: payload.item,
          email: payload.useremail,
        },
        {
          headers: {
            "Content-Type": "application/json",
            // authorization: `${token}`,
          },
        }
      )
      .then((res) => {
        console.log("add_quantity", res.data);
        dispatch(addQuantity(res.data));
      });
  };
};

//SUB_QUANTITY
export const sub_quantity = (payload) => {
  return (dispatch, getState) => {
    console.log("payload", payload);
    // const userinfo = JSON.parse(localStorage.getItem("user"));
    // const token = userinfo.token;
    axios
      .post(
        "http://localhost:4000/user/subquantity",
        {
          item: payload.item,
          email: payload.useremail,
        },
        {
          headers: {
            "Content-Type": "application/json",
            // authorization: `${token}`,
          },
        }
      )
      .then((res) => {
        console.log("sub_quantity", res.data);
        dispatch(subtractQuantity(res.data));
      });
  };
};

//ADD_SHIPMENT
export const add_shipment = (payload) => {
  return (dispatch, getState) => {
    console.log("payload", payload);
    // const userinfo = JSON.parse(localStorage.getItem("user"));
    // const token = userinfo.token;
    axios
      .post(
        "http://localhost:4000/user/addshipment",
        {
          item: payload.item,
          email: payload.useremail,
        },
        {
          headers: {
            "Content-Type": "application/json",
            // authorization: `${token}`,
          },
        }
      )
      .then((res) => {
        console.log("add_shipment", res.data);
        dispatch(addShipping());
      });
  };
};

//SUB_SHIPMENT
export const sub_shipment = (payload) => {
  return (dispatch, getState) => {
    console.log("payload", payload);
    // const userinfo = JSON.parse(localStorage.getItem("user"));
    // const token = userinfo.token;
    axios
      .post(
        "http://localhost:4000/user/subshipment",
        {
          item: payload.item,
          email: payload.useremail,
        },
        {
          headers: {
            "Content-Type": "application/json",
            // authorization: `${token}`,
          },
        }
      )
      .then((res) => {
        console.log("sub_shipment", res.data);
        dispatch(substractShipping(res.data));
      });
  };
};
