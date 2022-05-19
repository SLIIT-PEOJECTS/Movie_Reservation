import React, { useState, useEffect } from "react";
import axios from "axios";
import "../asset/css/Login.css";

function Login(props) {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [manager, setManager] = useState([]);
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  const Swal = require("sweetalert2");

  async function Login() {
    // const user = { email, password }
    console.log(email, password);
    axios
      .post("http://localhost:8081/user/login", { email, password })
      .then((mresponse) => {
        console.log(mresponse);
        if (mresponse.data == null) {
          Swal.fire({
            title: "Login Failed!",
            text: "Email or Password incorrect",
            icon: "error",
            confirmButtonText: "Try again",
          });
        } else {
          setTimeout(() => {
            window.location.href = "/";
          }, 500);
          const Swal = require("sweetalert2");
          Swal.fire({
            title: "Success!",
            text: "Profile Created Successfully",
            icon: "success",
            confirmButtonText: "Cool",
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          title: "Error!",
          text: "Login Failed",
          icon: "error",
          confirmButtonText: "Try again",
        });
      });
  }

  return (
    <div className="App">
      <div class="container-fluid ps-md-0">
        <div class="row g-0">
          <div class="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
          <div class="col-md-8 col-lg-6">
            <div class="login d-flex align-items-center py-5">
              <div class="container">
                <div class="row">
                  <div class="col-md-9 col-lg-8 mx-auto">
                    <h3 class="login-heading mb-4">
                      Welcome To X-trem Movie Hub
                    </h3>

                    <form on>
                      <div class="form-floating mb-3">
                        <input
                          type="email"
                          className={"form-control "}
                          id="floatingInput"
                          name="email"
                          placeholder="name@example.com"
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                        />
                        <label for="floatingInput">Email address</label>
                      </div>
                      <div class="form-floating mb-3">
                        <input
                          type="password"
                          className={"form-control "}
                          id="floatingPassword"
                          name="password"
                          placeholder="Password"
                          onChange={(e) => {
                            setPassword(e.target.value);
                          }}
                        />
                        <label for="floatingPassword">Password</label>
                      </div>

                      <div class="form-check mb-3">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value=""
                          id="rememberPasswordCheck"
                        />
                        <label
                          class="form-check-label"
                          for="rememberPasswordCheck"
                        >
                          Remember password
                        </label>
                      </div>

                      <div class="d-grid">
                        <button
                          class="btn btn-lg btn-primary btn-login text-uppercase fw-bold mb-2"
                          type="button"
                          onClick={Login}
                        >
                          Sign in
                        </button>
                        <button
                          class="btn btn-lg btn-primary btn-login text-uppercase fw-bold mb-2"
                          type="button"
                          onClick={() => this.routeChange()}
                        >
                          Create Account
                        </button>
                        <div class="text-center">
                          <a class="small" href="#">
                            Forgot password?
                          </a>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
