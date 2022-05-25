import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import "../pages/Manager/ManagerProfile.css";
import { getToken } from "../Services/SessionManager";

const Userprofile = (props) => {
  // state
  const [user, setUser] = useState([]);

  let id = JSON.parse(sessionStorage.getItem("userId"));

  useEffect(() => {
    axios
      .get(`http://localhost:8081/user/profile/${id}`, {})
      .then((response) => {
        console.log(response);
        setUser(response.data);
      })
      .catch((error) => alert("Error Loading Manager Details"));

    var date = user.DOB;
    var momentDate = moment.utc(date).format("MM/DD/YYYY");
    console.log(momentDate);
  }, []);

  return (
    <div>
      <div
        className="container "
        style={{ marginLeft: "90px", position: "absolute" }}
      >
        <div
          className="card scrollable-div"
          style={{ width: "1240px", height: "590px" }}
        >
          <div className="container card bg-light ">
            <div className="card-body ">
              <h1 align="center ">{user.firstName}'s Profile</h1>
              <br />
              <div className="main-body ">
                <div className="row gutters-sm">
                  <div className="col-md-4 mb-3">
                    <div className="card border-success">
                      <div className="card-body">
                        <div className="d-flex flex-column align-items-center text-center">
                          <div className="mt-3">
                            <h4>{user.firstName + " " + user.lastName}</h4>
                            <p className="text-secondary mb-1">{user.email}</p>
                            <p className="text-muted font-size-sm">
                              {user.tel}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card mt-3">
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                          <h6 className="mb-0">Username</h6>
                          <span className="text-success">{user.email}</span>
                        </li>
                        <br />
                        <div className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                          <div className="col-sm-12">
                            <a
                              className="btn btn-info"
                              style={{ width: "100%" }}
                              href={`/update-profile/${id}`}
                            >
                              Edit
                            </a>
                          </div>
                        </div>
                      </ul>
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="card mb-3">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Name in Full</h6>
                          </div>
                          <div className="col-sm-9 text-blue">
                            {user.firstName + " " + user.lastName}
                          </div>
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col-sm-3">
                            <h6 className="mb-0">First Name</h6>
                          </div>
                          <div className="col-sm-9 text-blue">
                            {user.firstName}
                          </div>
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Last Name</h6>
                          </div>
                          <div className="col-sm-9 text-blue">
                            {user.lastName}
                          </div>
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Email</h6>
                          </div>
                          <div className="col-sm-9 text-blue">{user.email}</div>
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Mobile Number</h6>
                          </div>
                          <div className="col-sm-9 text-blue">{user.tel}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Userprofile;
