import {
  ADD_TO_CART,
  REMOVE_ITEM,
  SUB_QUANTITY,
  ADD_QUANTITY,
  ADD_SHIPPING,
  SUB_SHIPPING,
  SET_LOGSTATUS,
  SET_LOGGEDINUSERNAME,
} from "../actions/action-types/cart-actions";
import Item1 from "../../images/item1.jpg";
import Item2 from "../../images/item2.jpg";
import Item3 from "../../images/item3.jpg";
import Item4 from "../../images/item4.jpg";
import Item5 from "../../images/item5.jpg";
import Item6 from "../../images/item6.jpg";
import Item7 from "../../images/item7.jpg";
import Item8 from "../../images/item8.jpg";

export const initState = {
  items: [
    {
      id: 1,
      title: "item1",
      desc: "desc1.",
      price: 50,
      img: Item1,
    },
    {
      id: 2,
      title: "item2",
      desc: "desc2.",
      price: 60,
      img: Item2,
    },
    {
      id: 3,
      title: "item3",
      desc: "desc3.",
      price: 70,
      img: Item3,
    },
    {
      id: 4,
      title: "item4",
      desc: "desc4.",
      price: 80,
      img: Item4,
    },
    {
      id: 5,
      title: "item5",
      desc: "desc5",
      price: 90,
      img: Item5,
    },
    {
      id: 6,
      title: "item6",
      desc: "desc6.",
      price: 100,
      img: Item6,
    },
    {
      id: 7,
      title: "item7",
      desc: "desc7.",
      price: 50,
      img: Item7,
    },
    {
      id: 8,
      title: "item8",
      desc: "desc8.",
      price: 60,
      img: Item8,
    },
  ],
  addedItems: [],
  total: 0,
  loginStaus: false,
  Loggedinusername: "",
};

const cartReducer = (state = initState, action) => {
  //Home Component
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        addedItems: action.payload.order.order,
        total: action.payload.sum,
      };
    case REMOVE_ITEM:
      return {
        ...state,
        addedItems: action.payload.order.order,
        total: action.payload.sum,
      };
    case ADD_QUANTITY:
      return {
        ...state,
        addedItems: action.payload.order.order,
        total: action.payload.sum,
      };
    case SUB_QUANTITY:
      return {
        ...state,
        addedItems: action.payload.order.order,
        total: action.payload.sum,
      };
    case ADD_SHIPPING:
      return {
        ...state,
        addedItems: action.payload.order.order,
        total: action.payload.sum,
      };
    case SUB_SHIPPING:
      return {
        ...state,
        addedItems: action.payload.order.order,
        total: action.payload.sum,
      };
    case SET_LOGSTATUS:
      return {
        ...state,
        loginStaus: action.payload,
      };
    case SET_LOGGEDINUSERNAME:
      return {
        ...state,
        Loggedinusername: action.payload,
      };

    default:
      return state;
  }
};

export default cartReducer;
