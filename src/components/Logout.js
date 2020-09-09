import React, { Component } from "react";
import "./Logout.css";
import { Link } from "react-router-dom";
import avatar from "../images/avatar.png"

class Logout extends Component {
  signOut = (e) => {
    e.preventDefault();
    localStorage.removeItem(`user`);
    this.props.history.push("/");
    window.location.reload();
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
          {" "}
          <div className="col s4"></div>{" "}
          <div className="col s3">
            <div className="card logout">
              <div className="card-content">
                <div className="row">
                  <div className="imgcontainer col s12">
                    <img
                      src={avatar}
                      alt="Avatar"
                      className="avatar"
                    />
                  </div>
                  <form className="col s12">
                    <div className="row">
                      <p className="return-home">
                        Still want to buy?{" "}
                        <span>
                          <Link to="/" className="redirect">
                            Return to HomePage
                          </Link>
                        </span>
                      </p>
                    </div>

                    <div className="row">
                      <button
                        className="btn waves-effect waves-light pink logout-btn "
                        name="action"
                        onClick={this.signOut}
                      >
                        Sign Out and Leave
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

export default Logout;
