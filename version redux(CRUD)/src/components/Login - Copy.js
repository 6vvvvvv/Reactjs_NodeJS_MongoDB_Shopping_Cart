import React, { Component } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { setStatus, setLoginUserName } from "./actions/cartActions";
import { connect } from "react-redux";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "" };
  }

  onChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  signInWithEmailAndPasswordHandler = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:4000/user/login",
        { email: this.state.email, password: this.state.password },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((response) => {
        console.log("response after login", response.data);

        localStorage.setItem(`user`, JSON.stringify(response.data.token));

        this.props.setStatus(true);
        this.props.setLoginUserName(response.data.username);

        this.props.history.push("/");
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
        localStorage.removeItem(`user`);
      });
  };

  render() {
    return (
      <div className="card login">
        <div className="card-content">
          <div className="row">
            <form className="col s12">
              <div className="row">
                <div className="input-field col s12">
                  <input
                    id="email"
                    type="email"
                    className="validate"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChangeHandler}
                  />
                  <label htmlFor="email">Email</label>
                </div>
              </div>

              <div className="row">
                <div className="input-field col s12">
                  <input
                    id="password"
                    type="password"
                    className="validate"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChangeHandler}
                  />
                  <label htmlFor="password">Password</label>
                </div>
              </div>

              <div className="row">
                <p className="register_descrip">
                  Not registered?{" "}
                  <span>
                    <Link to="/register" className="redirect">
                      Create an account
                    </Link>
                  </span>
                </p>
              </div>

              <div className="row">
                <button
                  className="btn waves-effect waves-light pink signin-btn "
                  name="action"
                  onClick={this.signInWithEmailAndPasswordHandler}
                >
                  Signin
                  <i className="material-icons right">send</i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setStatus: (payload) => dispatch(setStatus(payload)),
  setLoginUserName: (payload) => dispatch(setLoginUserName(payload)),
});

export default connect(null, mapDispatchToProps)(Login);
