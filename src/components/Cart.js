import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  removeItem,
  addQuantity,
  subtractQuantity,
} from "./actions/cartActions";
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
          Authorization: `${userinfo}`,
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
  const handleRemove = (id) => {
    props.removeItem(id);
  };
  //Add the quantity
  const handleAddQuantity = (id) => {
    props.addQuantity(id);
  };
  //Substruct the quantity
  const handleSubtractQuantity = (id) => {
    props.subtractQuantity(id);
  };

  let addedItems =
    props.items.length && user ? (
      props.items.map((item) => {
        return (
          <li className="collection-item avatar" key={item.id}>
            <div className="item-img">
              <img src={item.img} alt={item.img} className="" />
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
                      handleAddQuantity(item.id);
                    }}
                  >
                    arrow_drop_up
                  </i>
                </Link>
                <Link to="/cart">
                  <i
                    className="material-icons"
                    onClick={() => {
                      handleSubtractQuantity(item.id);
                    }}
                  >
                    arrow_drop_down
                  </i>
                </Link>
              </div>
              <button
                className="waves-effect waves-light btn pink remove"
                onClick={() => {
                  handleRemove(item.id);
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
    removeItem: (id) => {
      dispatch(removeItem(id));
    },
    addQuantity: (id) => {
      dispatch(addQuantity(id));
    },
    subtractQuantity: (id) => {
      dispatch(subtractQuantity(id));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
