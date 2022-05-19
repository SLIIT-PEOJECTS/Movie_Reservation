import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import "../asset/css/Navigation.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../asset/css/Registration.css";
import Header from "./Header";
import Footer from "./Footer";

function Register() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await axios.post("http://localhost:8081/user/create", {
        firstName: firstname,
        lastName: lastname,
        email: email,
        tel: tel,
        password: password,
      });
      setFirstName("");
      setLastName("");
      setEmail("");
      setTel("");
      setPassword("");
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
      const Swal = require("sweetalert2");
      Swal.fire({
        title: "Success!",
        text: "Profile Created Successfully",
        icon: "success",
        confirmButtonText: "Cool",
      });
    } catch (err) {
      alert("User Registation Failed");
    }
  }

  return (
    <div className="App">
      <div className="container-fluid ps-md-0">
        <div className="row g-0">
          <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
          <div className="col-md-8 col-lg-6">
            <div className="login d-flex align-items-center py-5">
              <div className="container">
                <div className="row">
                  <div className="col-md-9 col-lg-8 mx-auto">
                    <h3 className="login-heading mb-4">
                      Welcome To X-trem Movie Hub
                    </h3>

                    <form onSubmit={handleSubmit}>
                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className={"form-control "}
                          id="floatingInput"
                          name="firstName"
                          placeholder="name@example.com"
                          onChange={(event) => {
                            setFirstName(event.target.value);
                          }}
                        />
                        <label htmlFor="floatingInput">First name</label>
                      </div>

                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className={"form-control "}
                          id="floatingInput"
                          name="lastName"
                          placeholder="name@example.com"
                          onChange={(event) => {
                            setLastName(event.target.value);
                          }}
                        />
                        <label htmlFor="floatingInput">Last name</label>
                      </div>

                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className={"form-control "}
                          id="floatingInput"
                          name="Contact number"
                          placeholder="name@example.com"
                          onChange={(event) => {
                            setTel(event.target.value);
                          }}
                        />
                        <label htmlFor="floatingInput">Contact number</label>
                      </div>

                      <div className="form-floating mb-3">
                        <input
                          type="email"
                          className={"form-control "}
                          id="floatingInput"
                          name="email"
                          placeholder="name@example.com"
                          onChange={(event) => {
                            setEmail(event.target.value);
                          }}
                        />
                        <label htmlFor="floatingInput">Email address</label>
                      </div>

                      <div className="form-floating mb-3">
                        <input
                          type="password"
                          className={"form-control "}
                          id="floatingPassword"
                          name="password"
                          placeholder="Password"
                          onChange={(event) => {
                            setPassword(event.target.value);
                          }}
                        />
                        <label htmlFor="floatingPassword">Password</label>
                      </div>

                      <div className="d-grid">
                        <button
                          className="btn btn-lg btn-primary btn-login text-uppercase fw-bold mb-2"
                          type="submit"
                        >
                          Sign up
                        </button>
                        <div className="text-center">
                          <p className="p1">
                            Already a member <a href="./Login">Signup</a>?
                          </p>
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
export default Register;
