import React, { Component } from "react";
import { connect } from "react-redux";
import { add_shipment, sub_shipment } from "../components/thunk/cart-thunk";

class Recipe extends Component {
  componentWillUnmount() {
    if (this.refs.shipping.checked) this.props.sub_shipment();
  }

  handleChecked = (e) => {
    const userinfo = JSON.parse(localStorage.getItem("user"));
    const useremail = userinfo.useremail;

    if (e.target.checked) {
      this.props.add_shipment(useremail);
    } else {
      this.props.sub_shipment(useremail);
    }
  };

  render() {
    return (
      <div className="container">
        <div className="collection">
          <li className="collection-item">
            <label>
              <input
                type="checkbox"
                ref="shipping"
                onChange={this.handleChecked}
              />
              <span>Shipping(+10$)</span>
            </label>
          </li>
          <li className="collection-item">
            <b>Total: {this.props.total} $</b>
          </li>
        </div>
        <div className="checkout">
          <button className="waves-effect waves-light btn">Checkout</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    addedItems: state.addedItems,
    total: state.total,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    add_shipment: (payload) => {
      dispatch(add_shipment(payload));
    },
    sub_shipment: (payload) => {
      dispatch(sub_shipment(payload));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Recipe);
