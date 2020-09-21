import React, { Component } from "react";
import { connect } from "react-redux";
import "./Home.css";
import M from "materialize-css/dist/js/materialize.min.js";
import { Link } from "react-router-dom";

import {
  addToCart,
  removeItem,
  addQuantity,
  subtractQuantity,
} from "./actions/cartActions";

class Home extends Component {
  componentDidMount = () => {
    M.AutoInit();
    let sidenav = document.querySelector("#slide-out");
    M.Sidenav.init(sidenav, { edge: "right" });
  };

  handleClick = (id) => {
    this.props.addToCart(id);
  };

  handleRemove = (id) => {
    this.props.removeItem(id);
  };
  //Add the quantity
  handleAddQuantity = (id) => {
    this.props.addQuantity(id);
  };
  //Substruct the quantity
  handleSubtractQuantity = (id) => {
    this.props.subtractQuantity(id);
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
                this.handleClick(item.id);
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

          {this.props.sidebaritems.length
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
                                  this.handleAddQuantity(item.id);
                                }}
                              >
                                arrow_drop_up
                              </i>
                            </Link>
                            <Link to="/">
                              <i
                                className="material-icons"
                                onClick={() => {
                                  this.handleSubtractQuantity(item.id);
                                }}
                              >
                                arrow_drop_down
                              </i>
                            </Link>
                          </div>
                          <button
                            className="waves-effect waves-light btn pink remove"
                            onClick={() => {
                              this.handleRemove(item.id);
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
    addToCart: (id) => {
      dispatch(addToCart(id));
    },
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
