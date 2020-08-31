import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import "./Register.css";
import axios from "axios";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", email: "", password: "" };
  }

  onChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  createUserWithEmailAndPasswordHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/user/signup", {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
      })
      .then((response) => {
        console.log("reponse after signup", response.data);
        this.props.history.push("/login");
      })
      .catch((err) => alert(err.message));
  };

  render() {
    return (
      <div className="container">
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        
        <div className="row">
          <div className="col s4"></div>
          <div className="col s3">
            <div className="card signup">
              <div className="card-content">
                <div className="row">
                  <form className="col s12">
                    <div className="row">
                      <div className="input-field col s12">
                        <input
                          id="username"
                          type="text"
                          className="validate"
                          name="username"
                          value={this.state.username}
                          onChange={this.onChangeHandler}
                        />
                        <label htmlFor="first_name">Username</label>
                      </div>
                    </div>

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
                      <p className="login_descrip">
                        Already registered?{" "}
                        <span>
                          <Link to="/login" className="redirect">
                            Sign In
                          </Link>
                        </span>
                      </p>
                    </div>
                    <div className="row">
                      <button
                        className="btn waves-effect waves-light pink signup-btn"
                        name="action"
                        //important like this way otherwise insivible for button until e happen
                        onClick={(e) => {
                          this.createUserWithEmailAndPasswordHandler(e);
                        }}
                      >
                        Signup
                        <i className="material-icons right">send</i>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Register);
