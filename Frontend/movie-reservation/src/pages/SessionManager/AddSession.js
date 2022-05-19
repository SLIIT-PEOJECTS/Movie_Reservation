import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
// import Select from 'react-select';
import Navbar from "../../components/dashboard/Navbar";
import Sidebar from "../../components/dashboard/Sidebar";
// import firebase from './firebase';
// import 'firebase/storage'


const AddSession = () => {
  //const [file, setFile] = useState(null);
  //const [movieURL, setURL] = useState("");
  //const [cast, setSelectedCast] = useState("");
  //const [tags, setSelectedTag] = useState("");

  const [state, setState] = useState({
    sessionName: "",
    fromTime: "",
    toTime: "",
  });

  const { sessionName, fromTime, toTime } = state;

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
      // close,
    });

    axios
      .post(`http://localhost:8081/session/`, {
        sessionName,
        fromTime,
        toTime,
      })
      .then((response) => {
        console.log(response);
        //show success alert
        // alert(`Employee ${response.data.firstName} is Created`);
        Swal.fire(
          `Session ${response.data.name} is Added`,
          "Click Ok to continue",
          "success"
        );
        setTimeout(() => {
          window.location.reload();
        }, 1000);

        setState({
          ...state,
          sessionName: "",
          fromTime: "",
          toTime: "",
        });
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: `${error.response.data.error}`,
          // text: `${error.response.data.error}`,
          footer: "Please try again",
        });
        // alert(error.response.data.error);
      });
  };

  return (
    <div>
      <Navbar />
      <Sidebar />

      <div
        className="container "
        style={{ marginLeft: "90px", position: "absolute" }}
      >
        <div
          className="card scrollable-div"
          style={{ width: "1240px", height: "590px" }}
        >
          <div className="card-body"></div>
          <h1 align="center">New Session</h1>
          <br />


          <div className="card">
            <div className="card-body">
              {/* <center>
                                <div class="row container ">
                                    <div class="col">
                                        <label className="text-muted"> <b>Upload Movie Picture (This is Optional)</b></label><br /><br />
                                        <div >
                                            <form onSubmit={handleUpload}>
                                                <input type="file" onChange={handleChangeImage} />
                                                <button disabled={!file}>upload to firebase</button>
                                            </form>
                                            <br />
                                            <img src={movieURL} alt="" style={{ width: "250px", height: "250px" }} />
                                        </div>
                                    </div>
                                </div>
                            </center> */}

              <br />
              <br />

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
                          placeholder="Enter the session starting time"
                          required
                        />
                      </div>
                    </div>
                    <div class="col">
                      <div class="col">
                        <div className="form-group">
                          <label className="text-muted">To Time</label>
                          <input
                            type="text"
                            onChange={handleChange("toTime")}
                            value={toTime}
                            className="form-control"
                            placeholder="Enter the session ending time"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    {/* <div className="form-group">
                                            <label className="text-muted">Genre</label>
                                            <select id="type" value={genre} onChange={handleChange("genre")} className="form-control">
                                                <option value="" disabled selected>Select a Genre</option>
                                                <option value="Action">Action</option>
                                                <option value="Adventure">Adventure</option>
                                                <option value="Animation">Animation</option>
                                                <option value="Biology">Biology</option>
                                                <option value="Comedy">Comedy</option>
                                                <option value="Romance">Romance</option>
                                                <option value="Documentary">Documentary</option>
                                                <option value="Drama">Drama</option>
                                                <option value="Horror">Horror</option>
                                            </select>
                                        </div> */}
                  </div>
                </div>

                {/* <div className="form-group">
                                    <label className="text-muted">Movie Description</label>
                                    <textarea onChange={handleChange("description")} value={description} type="text" className="form-control" placeholder="Enter the Movie Description" pattern="{1,300}" required />
                                </div> */}

                {/* <div class="row">
                                    <div class="col">
                                        <div className="form-group">
                                            <label className="text-muted"> Movie Language</label>
                                            <select id="type" value={language} onChange={handleChange("language")} className="form-control">
                                                <option value="" disabled selected>Select a Language</option>
                                                <option value="Sinhala">Sinhala</option>
                                                <option value="English">English</option>
                                                <option value="Tamil">Tamil</option>
                                                <option value="Spanish">Spanish</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div className="form-group">
                                            <label className="text-muted">Rating</label>
                                            <select id="type" value={rating} onChange={handleChange("rating")} className="form-control">
                                                <option value="" disabled selected>Select a Rating</option>
                                                <option value="1">Star 1</option>
                                                <option value="2">Star 2</option>
                                                <option value="3">Star 3</option>
                                                <option value="4">Star 4</option>
                                                <option value="5">Star 5</option>
                                            </select>
                                        </div>
                                    </div>
                                </div> */}
                <br />
                {/* <div className="form-group">
                                    <label className="text-muted">Theater Address</label>
                                    <textarea onChange={handleChange("address")} value={address} type="text" className="form-control" placeholder="Enter the Theater Address" pattern="{1,300}" required />
                                </div> */}
                <br />
                {/* <div class="row">
                                    <div class="col">
                                        <div className="form-group">
                                            <label className="text-muted">Close</label>
                                            <select id="type" value={close} onChange={handleChange("close")} className="form-control">
                                                <option value="" disabled selected>Select an Option</option>
                                                <option value="true">Open</option>
                                                <option value="false">Close</option>
                                            </select>
                                        </div>
                                    </div> */}
                {/* <div class="col">
                                        <div className="form-group">
                                            <label className="text-muted">Number of Seats</label>
                                            <input type="text" onChange={handleChange('noOfSeat')} value={noOfSeat} className="form-control" placeholder="Enter the Release Date" pattern="[0-9]+" title="Please enter only numbers" required />
                                        </div>
                                    </div> */}
                {/* </div> */}
                <br />
                <br />
                <div>
                  <button className="btn btn-primary btn-lg btn-block">
                    Add Session
                  </button>
                </div>
                <br />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSession;
