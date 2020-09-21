import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Navbar = (props) => {
  return (
    <nav className="nav-wrapper">
      <div className="container">
        {/* <Link to="/" className="brand-logo">
          Shopping
        </Link> */}

        {props.loginStaus ? (
          <ul className="right">
            <li>
              <Link to="/">Shop</Link>
            </li>
            <li>
              <Link to="/logout">Logout</Link>
            </li>
            <li>
              <Link to="/cart">My Cart</Link>
            </li>
            <li>
              <Link to="/cart">
                <i className="material-icons">shopping_cart</i>
              </Link>
            </li>
          </ul>
        ) : (
          <ul className="right">
            <li>
              <Link to="/">Shop</Link>
            </li>
            <li>
              <Link to="/register">Signup</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/cart">My Cart</Link>
            </li>
            <li>
              <Link to="/cart">
                <i className="material-icons">shopping_cart</i>
              </Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => ({
  loginStaus: state.loginStaus,
  userLoggedin: state.userLoggedin,
});

export default connect(mapStateToProps, null)(Navbar);
