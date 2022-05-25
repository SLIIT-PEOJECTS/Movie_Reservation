import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "./Session.css";
import Navbar from "../../components/dashboard/Navbar";
import Sidebar from "../../components/dashboard/Sidebar";

const UpdateSession = (props) => {
  const { id } = useParams();

  const [state, setState] = useState({
    sessionName: "",
    fromTime: "",
    toTime: "",
  });

  //destructure values from state
  const { sessionName, fromTime, toTime,} = state;

  console.log(`PROP TEST: ${id}`);

  useEffect(() => {
    axios
      .get(`http://localhost:8081/session/${id}`)
      .then((response) => {
        console.log(response);
        const { sessionName, fromTime, toTime } = response.data;

        setState({
          ...state,
          sessionName, 
          fromTime, 
          toTime
        });
      })
      .catch((error) => alert("Error Loading Update Session"));
  }, []);

  const showUpdateForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group"></div>
      <div class="row">
        <div class="col">
          <div className="form-group">
            <label className="text-muted">Session Name</label>
            <input
              onChange={handleChange("sessionName")}
              value={sessionName}
              type="text"
              className="form-control"
              placeholder="Enter the Session Name"
              required
            />
          </div>
        </div>
        <div class="col">
          <div class="col">
            <div className="form-group">
              <label className="text-muted">From Time</label>
              <input
                type="text"
                onChange={handleChange("fromTime")}
                value={fromTime}
                className="form-control"
                placeholder="Enter the Starting Time"
                required
              />
            </div>
          </div>
        </div>
      </div>
      <br />
      <div className="form-group">
        <label className="text-muted">To time</label>
        <textarea
          onChange={handleChange("toTime")}
          value={toTime}
          type="text"
          className="form-control"
          placeholder="Enter the Ending Time"
          required
        />
      </div>
      <br />
      <div>
        <button className="btn btn-primary btn-lg btn-block">
          Update Session
        </button>
      </div>
      <br />
    </form>
  );

  function handleChange(name) {
    return function (event) {
      setState({ ...state, [name]: event.target.value });
    };
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.table({
        sessionName, 
        fromTime, 
        toTime,
    });
    axios
      .put(`http://localhost:8081/session/${id}`, {
        sessionName, 
          fromTime, 
          toTime,
      })
      .then((response) => {
        console.log(response);
        const { sessionName, 
            fromTime, 
            toTime } = response.data;

        //empty state
        setState({
          ...state,
          sessionName, 
            fromTime, 
            toTime,
        });

        //show success alert
        // alert(`Staff Member ${firstName} is Updated`);
        Swal.fire(
          `Session ${sessionName} is Updated`,
          "Click Ok to continue",
          "success"
        );
      })
      .catch((error) => {
        console.log(error.Response);
        // alert(error.response.data.error)
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error.response.data.error}`,
          footer: "Please try again",
        });
      });
  };

  return (
    <div>
      <Navbar />
      <Sidebar />
      <div
        className="container"
        style={{ marginLeft: "90px", position: "absolute" }}
      >
        <div
          className="card scrollable-div"
          style={{ width: "1240px", height: "590px" }}
        >
          <div className="card bg-light mb-3">
            <div className="card-body">
              <h1 align="center">Update Session</h1>
              <br />
              {showUpdateForm()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateSession;
