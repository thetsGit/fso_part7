import React from "react";
import propTypes from "prop-types";
import "../mdb.dark.min.css";
import AlertBox from "./AlertBox";

const LoginForm = (props) => {
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-6 offset-3">
          <div className="card">
            <div className="card-header">
              <h1>Log in here</h1>
            </div>
            <div className="card-body">
              {props.message.message !== "no notification" && (
                <AlertBox
                  message={props.message.message}
                  type={props.message.messageStatus}
                />
              )}
              <form onSubmit={(e) => props.submitHandler(e)} className="">
                <div className="mb-3">
                  <label htmlFor="username" className="form-lable mb-1">
                    username{" "}
                  </label>
                  <input
                    id="username"
                    type="text"
                    name="username"
                    value={props.username}
                    onChange={({ target }) =>
                      props.usernameInputHandler(target)
                    }
                    className="form-control"
                  ></input>
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-lable mb-1">
                    password{" "}
                  </label>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    value={props.password}
                    onChange={({ target }) =>
                      props.passwordInputHandler(target)
                    }
                    className="form-control"
                  ></input>
                </div>
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

LoginForm.propTypes = {
  username: propTypes.string.isRequired,
  password: propTypes.string.isRequired,
  usernameInputHandler: propTypes.func.isRequired,
  passwordInputHandler: propTypes.func.isRequired,
  submitHandler: propTypes.func.isRequired,
};

export default LoginForm;
