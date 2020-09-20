import React, { Component } from "react";
import { connect } from "react-redux";
import "./Home.css";
import M from "materialize-css/dist/js/materialize.min.js";
import { Link } from "react-router-dom";
import {
  add_item_toback,
  remove_item_fromback,
  add_quantity,
  sub_quantity,
} from "../components/thunk/cart-thunk";

class Home extends Component {
  componentDidMount = () => {
    M.AutoInit();
    let sidenav = document.querySelector("#slide-out");
    M.Sidenav.init(sidenav, { edge: "right" });
  };

  //Add the quantity on the card
  handleClick = (item) => {
    const userinfo = JSON.parse(localStorage.getItem("user"));
    const useremail = userinfo.useremail;
    const payload = {
      item,
      useremail,
    };
    this.props.add_item_toback(payload);
  };

  //Add the quantity
  handleAddQuantity = (item) => {
    const userinfo = JSON.parse(localStorage.getItem("user"));
    const useremail = userinfo.useremail;
    const payload = {
      item,
      useremail,
    };

    this.props.add_quantity(payload);
  };
  //Substruct the quantity
  handleSubtractQuantity = (item) => {
    const userinfo = JSON.parse(localStorage.getItem("user"));
    const useremail = userinfo.useremail;
    const payload = {
      item,
      useremail,
    };
    this.props.sub_quantity(payload);
  };
  //remove item
  handleRemove = (item) => {
    const userinfo = JSON.parse(localStorage.getItem("user"));
    const useremail = userinfo.useremail;
    const payload = {
      item,
      useremail,
    };
    this.props.remove_item_fromback(payload);
  };

  render() {
    let itemList = this.props.items.map((item) => {
      return (
        <div className="card card-display" key={item.id}>
          <div className="card-image">
            <img src={item.img} alt={item.title} />

            <span
              to="/"
              className="btn-floating halfway-fab waves-effect waves-light red"
              onClick={() => {
                this.handleClick(item);
              }}
            >
              <i className="material-icons">add</i>
            </span>
          </div>
          <div className="card-content">
            <span className=" itemname">{item.title}</span>
            <p>{item.desc}</p>
            <p>
              <b>Price: {item.price}$</b>
            </p>
          </div>
        </div>
      );
    });

    return (
      <div className="container">
        <br></br>
        <ul id="slide-out" className="sidenav">
          <nav className="sidebar-nav">
            <div className="nav-wrapper">
              <p className="sidenav-headtext">Your Basket</p>
            </div>
          </nav>

          {this.props.sidebaritems
            ? this.props.sidebaritems.map((item) => {
                return (
                  <li key={item.id}>
                    <div className="card horizontal ">
                      <div className="card-image">
                        <img src={item.img} alt={item.img} />
                      </div>
                      <div className="card-stacked">
                        <div className="card-content">
                          <span className="title">{item.title}</span>

                          <p>
                            <b>Price: {item.price}$</b>
                          </p>
                          <p>
                            <b>Quantity: {item.quantity}</b>
                          </p>
                          <div className="add-remove">
                            <Link to="/">
                              <i
                                className="material-icons"
                                onClick={() => {
                                  this.handleAddQuantity(item);
                                }}
                              >
                                arrow_drop_up
                              </i>
                            </Link>
                            <Link to="/">
                              <i
                                className="material-icons"
                                onClick={() => {
                                  this.handleSubtractQuantity(item);
                                }}
                              >
                                arrow_drop_down
                              </i>
                            </Link>
                          </div>
                          <button
                            className="waves-effect waves-light btn pink remove"
                            onClick={() => {
                              this.handleRemove(item);
                            }}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })
            : null}
        </ul>
        <Link to="/" data-target="slide-out" className="sidenav-trigger">
          <i className="material-icons">menu</i>
        </Link>
        <div className="box">{itemList}</div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    items: state.items,
    sidebaritems: state.addedItems,
    Loggedinusername: state.Loggedinusername,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    add_item_toback: (payload) => {
      dispatch(add_item_toback(payload));
    },
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
