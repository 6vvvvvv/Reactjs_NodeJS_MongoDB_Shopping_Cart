import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  remove_item_fromback,
  add_quantity,
  sub_quantity,
} from "../components/thunk/cart-thunk.js";
import Recipe from "./Recipe";
import "./Cart.css";
import axios from "axios";

const Cart = (props) => {
  const [user, setUser] = useState("");

  useEffect(() => {
    if (!localStorage.length) {
      return props.history.push("/login");
    }

    var userinfo = JSON.parse(localStorage.getItem("user"));
    console.log("user", userinfo);

    axios
      .get("http://localhost:4000/user/me", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `${userinfo.token}`,
        },
      })
      .then((res) => {
        if (res.data.user) {
          setUser(res.data.user);
        }
      })
      .catch((error) => {
        console.error(error);
        return props.history.push("/login");
      });
  }, [props.history]);

  //Remove the item
  const handleRemove = (item) => {
    const userinfo = JSON.parse(localStorage.getItem("user"));
    const useremail = userinfo.useremail;
    const payload = {
      item,
      useremail,
    };
    props.remove_item_fromback(payload);
  };
  //Add the quantity
  const handleAddQuantity = (item) => {
    console.log("item-------------", item);
    const userinfo = JSON.parse(localStorage.getItem("user"));
    const useremail = userinfo.useremail;
    const payload = {
      item,
      useremail,
    };
    props.add_quantity(payload);
  };
  //Substruct the quantity
  const handleSubtractQuantity = (item) => {
    const userinfo = JSON.parse(localStorage.getItem("user"));
    const useremail = userinfo.useremail;
    const payload = {
      item,
      useremail,
    };
    props.sub_quantity(payload);
  };

  let addedItems =
    props.items.length > 0 && user ? (
      props.items.map((item) => {
        return (
          <li className="collection-item avatar" key={item.id}>
            <div className="item-img">
              <img src={item.img} alt={item.img} />
            </div>

            <div className="item-desc">
              <span className="title">{item.title}</span>
              <p>{item.desc}</p>
              <p>
                <b>Price: {item.price}$</b>
              </p>
              <p>
                <b>Quantity: {item.quantity}</b>
              </p>
              <div className="add-remove">
                <Link to="/cart">
                  <i
                    className="material-icons"
                    onClick={() => {
                      handleAddQuantity(item);
                    }}
                  >
                    arrow_drop_up
                  </i>
                </Link>
                <Link to="/cart">
                  <i
                    className="material-icons"
                    onClick={() => {
                      handleSubtractQuantity(item);
                    }}
                  >
                    arrow_drop_down
                  </i>
                </Link>
              </div>
              <button
                className="waves-effect waves-light btn pink remove"
                onClick={() => {
                  handleRemove(item);
                }}
              >
                Remove
              </button>
            </div>
          </li>
        );
      })
    ) : (
      <p>Nothing.</p>
    );
  return (
    <div className="container">
      <div className="cart">
        <h5>You have ordered:</h5>
        <ul className="collection">{addedItems}</ul>
      </div>
      <Recipe />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    items: state.addedItems,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    remove_item_fromback: (payload) => {
      dispatch(remove_item_fromback(payload));
    },
    add_quantity: (payload) => {
      dispatch(add_quantity(payload));
    },
    sub_quantity: (payload) => {
      dispatch(sub_quantity(payload));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
