import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert";
import './Session.css';
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import Navbar from "../../components/dashboard/Navbar";
import Sidebar from "../../components/dashboard/Sidebar";

const DisplayAll = () => {
  const [session, setSession] = useState([]);
  const [count, setCount] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  // Fetch All Sessions
  const fetchSession = () => {
    axios
      .get("http://localhost:8081/session/")
      .then((response) => {
        console.log(response);
        setSession(response.data);
        setCount(response.data.length);
      })
      .catch((error) => {
        console.log(error);
        // alert("Error Fetching Staff Members")
      });
  };
  const deleteSession = (sessionID) => {
    Swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Session!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete(`http://localhost:8081/session/${sessionID}`)
          .then((response) => {
            // alert(response.data.message);
            Swal("The Session is Deleted!", {
              icon: "success",
            });
            fetchSession();
          })
          .catch((error) => Swal("Error deleting Session"));
      } else {
        Swal("Session didn't deleted!");
      }
    });
  };

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    console.log(searchWord);
    setWordEntered(searchWord);
    axios
      .get("http://localhost:8081/session/")
      .then((response) => {
        console.log(response);
        const newFilter = session.filter((response) => {
          return response.name.toLowerCase().includes(searchWord.toLowerCase());
        });

        if (searchWord === "") {
          console.log("EMPLTY");
          fetchSession();
        } else {
          setSession(newFilter);
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchSession();
  }, []);

  return (
    <div>
      <Navbar />
      <Sidebar />

      <div style={{ marginLeft: "90px", position: "absolute" }}>
        {/* <div class="container-fluid" id="main">
                        <div class="row row-offcanvas row-offcanvas-left">
                            
                        </div>
                    </div> */}
        <div
          className="card scrollable-div"
          style={{ width: "1240px", height: "590px" }}
        >
          <div className="card-body ">
            <h1 align="center">Session</h1>
            <br />
            <div>
              <center>
                <div
                  className="border border-info "
                  style={{
                    width: "100%",
                    backgroundColor: "white",
                    borderRadius: "10px",
                    borderColor: "#00408C",
                    padding: "20px 20px 20px 20px",
                    margin: "10px 0px 0px 0px",
                    align: "center",
                  }}
                >
                  <div className="row">
                    <div className="col">
                      <span style={{ color: "blue" }}>
                        <h3>{count}</h3>
                      </span>
                      <span>
                        <h3>Number of Sessions in this week</h3>
                      </span>
                    </div>
                    {/* <div className="col">
                                                <i
                                                    class="fa  fa-hourglass-end"
                                                    aria-hidden="true"
                                                    style={{
                                                        color: "blue",
                                                        fontSize: "30px",
                                                        marginTop: "10px",
                                                    }}
                                                ></i>
                                            </div> */}
                  </div>
                </div>
                <form
                  style={{
                    marginTop: "40px",
                    marginLeft: "20px",
                    marginRight: "40px",
                    width: "100%",
                  }}
                >
                  <div className="col-lg-3 mt-2 mb-2">
                    <input
                      className="form-control"
                      type="search"
                      placeholder="Search"
                      value={wordEntered}
                      onChange={handleFilter}
                    />
                  </div>
                </form>
              </center>
            </div>

            <div className="scrollable-div">
              <center>
                <a
                  className="btn btn-success btn-lg btn-block"
                  href={`/new-session`}
                >
                  <i class="fas fa-solid fa-plus">&nbsp; New Session</i>
                </a>
                <a>
                  <ReactHTMLTableToExcel
                    className="btn btn-outline-success"
                    table="table"
                    filename="Session Excel"
                    sheet="Sheet"
                    buttonText="Download Excel Sheet"
                  />
                </a>
              </center>

              <table
                id="table"
                class="table scrollable-div "
                responsive
                className="table table-hover"
                style={{ marginTop: "40px", marginLeft: "20px", width: "95%" }}
              >
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Session Name</th>
                    <th>Session Start Time</th>
                    <th>Session End Time</th>
                    {/* <th>Language</th>
                                                <th>Type</th> */}
                    {/* <th>Created At</th> */}
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {session.map((session, i) => (
                    <tr key={i}>
                      <th scope="row">{i + 1}</th>

                      {/* <a
                        href={`/update-movie/${theater.id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <td>{theater.name}</td>
                      </a> */}

                      <td>{session.sessionName}</td>
                      <td>{session.fromTime}</td>
                      {/* <td>{theater.close.toString()}</td> */}
                      <td>{session.toTime}</td>
                      {/* <td>{theater.language}</td>
                                                    <td>{theater.tags.join("/")}</td> */}
                      {}

                      <td>
                        {/* <a className="" href={`/update-theater/${theater.id}`}>
                          <i className="fas fa-edit"></i>&nbsp;
                        </a> */}
                        &nbsp;
                        <a
                          className=""
                          href="#"
                          onClick={() => deleteSession(session.sessionID)}
                        >
                          <i className="far fa-trash-alt"></i>&nbsp;
                        </a>
                        &nbsp;
                        {/* <a href={`/attendance/${theater.employeeId}`} style={{ textDecoration: 'none' }}>
                                                            <i class="fas fa-calendar-week"></i>&nbsp;
                                                        </a> */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <br />
            {/* <div style={{ marginTop: '', marginLeft: "1030px" }}>
                                    <ReactHTMLTableToExcel
                                        className='btn btn-outline-success'
                                        table='table'
                                        filename='Theater Excel'
                                        sheet='Sheet'
                                        buttonText='Download Excel Sheet'
                                    />
                                </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayAll;
