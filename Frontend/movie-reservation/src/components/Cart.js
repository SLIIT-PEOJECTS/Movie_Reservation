import React, { useState, useEffect } from "react";
import axios from 'axios';
import Header from "./Header";
import Footer from "./Footer";
import "../asset/css/Cart.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { TrashFill } from "react-bootstrap-icons";
import { Button, Modal, Form, } from 'react-bootstrap';
import { useNavigate, useParams } from "react-router-dom";
import QRCode from "qrcode.react";
import PaypalButton from './PaypalButton';

function Carts() {
  let { moviename } = useParams();

  const navigate = useNavigate();
  var theater;
  var session;

  const [sessions, setSessions] = React.useState([]);
  const [theaters, setTheaters] = React.useState([]);
  const [radioValue, setRadioValue] = useState(0);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getSession = env.BACKEND_SOURCE + '/session/.';

  const getTheater = 'http://localhost:8081/theater/';

  const getSessionList = () => {
    axios.get(`${getSession}`).then((res) => {
      setSessions(res.data);
    }).catch(error => console.error(`Error: ${error}`));
  }

  const getTheaterList = () => {
    axios.get(`${getTheater}`).then((res) => {
      setTheaters(res.data);
    }).catch(error => console.error(`Error: ${error}`))
  }

  const onChangeTheater = (ev) => {
    theater = ev.target.value;
    console.log(theater);
  };

  const onChangeSession = (ev) => {
    session = ev.target.value;
    console.log(session);
  };

  const onClickPayment = (ev) => {
    setShow(false);
  };

  useEffect(() => {
    getSessionList();
    getTheaterList();
  }, [])


  // const script = document.createElement("script");

  //   script.src = "https://www.paypal.com/sdk/js?client-id=AfkFATvgg2kWJBxv-2cA2U1xqBRWCnSqzmf1d9hpPM8juiYTcLgXEaC_Je_Cw2YprI0OolF78eovfaWW&currency=USD&intent=capture&enable-funding=venmo";
  //   script.async = true;

  //   document.body.appendChild(script);

  return (
    <div className="App">
      <Header tab="My Cart" />

      <section class="section-content padding-y mt-5">
        <div class="container">
          <div class="row">
            <main class="col-md-9">
              <div class="card">
                <table class="table table-borderless table-shopping-cart">
                  <thead class="text-muted">
                    <tr class="small text-uppercase">
                      <th scope="col">Movie</th>
                      <th scope="col" width="120">
                        No of Tickets
                      </th>
                      <th scope="col" width="120">
                        Price
                      </th>
                      <th scope="col" class="text-right" width="200">
                        {" "}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <figure class="itemside">
                          <div class="aside">
                            <img
                              src="https://cdn.pixabay.com/photo/2016/03/31/18/36/cinema-1294496__340.png"
                              class="img-sm"
                              style={{ width: "3rem" }}
                            />
                          </div>
                          <figcaption class="info">
                            <a href="#" class="title text-dark">
                              {moviename}
                            </a>
                            <p class="text-muted small">
                              choose tickect amount <br /> pay with your card
                            </p>
                          </figcaption>
                        </figure>
                      </td>
                      <td>
                        <select class="form-control">
                          <option>0</option>
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                        </select>
                      </td>
                      <td>
                        <div class="price-wrap">
                          <var class="price">Rs.1156.00</var>
                          <small class="text-muted"> Rs.315.20 each </small>
                        </div>
                      </td>
                      <td class="text-right">
                        <a
                          data-original-title="Save to Wishlist"
                          title=""
                          href=""
                          class="btn btn-light mr-2"
                          data-toggle="tooltip"
                        >
                          <TrashFill color="#ef5350" />
                        </a>
                        <a href="" class="btn btn-light">
                          {" "}
                          Purchase
                        </a>                        
                      </td>
                      <td>
                        <div>
                          <Button variant="dark" onClick={handleShow}>
                            Session
                          </Button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <div class="card-body border-top">
                  <a href="" class="btn btn-primary float-md-right">
                    {" "}
                    Make Purchase <i class="fa fa-chevron-right"></i>{" "}
                  </a>
                  <a
                    href="#"
                    class="btn btn-light"
                    onClick={() => {
                      navigate(`/home`);
                    }}
                  >
                    {" "}
                    <i class="fa fa-chevron-left"></i> Continue shopping{" "}
                  </a>
                </div>
              </div>

              <div class="alert alert-success mt-3">
                <span>
                  <p class="icontext">
                    <i class="icon text-success fa fa-truck"></i> Happy Movie
                    Hour
                  </p>
                </span>
              </div>
            </main>
            <aside class="col-md-3">
              <div class="card mb-3">
                <div class="card-body">
                  <form>
                    <div class="form-group">
                      <label>Scan Here For E-Purchase</label>
                      <div class="qr-view">
                        <QRCode
                          id="qr-gen"
                          value={`Thank You For Booking Ticket For ${theater} + ${session} - From ${sessions.fromTime} To ${sessions.toTime}`}
                          size={200}
                          level={"H"}
                          includeMargin={true}
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div class="card">
                <div class="card-body">
                  <dl class="dlist-align">
                    <dt>Total price:</dt>
                    <dd class="text-right">Rs. 568</dd>
                  </dl>
                  <dl class="dlist-align">
                    <dt>Discount:</dt>
                    <dd class="text-right">Rs. 658</dd>
                  </dl>
                  <dl class="dlist-align">
                    <dt>Total:</dt>
                    <dd class="text-right  h5">
                      <strong>Rs.1,650</strong>
                    </dd>
                  </dl>
                  <hr />
                  {/* <p class="text-center mb-3">
                    <img
                      src="https://flyclipart.com/thumb2/paypal-credit-card-logos-png-672268.png"
                      height="26"
                    />
                  </p> */}
                  <PaypalButton
                        total={'100'}
                        clearCart={'clearCart'}
                        history={'history'} />
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
      <Footer />

      {/* popup model */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h2>Select Your Movie Session</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {sessions.map((data) => (
              <Form.Check
                name="group1"
                type="radio"
                id="session"
                value={`${data.sessionName}`}
                onChange={onChangeSession}
                label={`${data.sessionName} - From ${data.fromTime} To ${data.toTime}`}
              />
            ))}

            {theaters.map((data) => (
              <Form.Check
                name="group2"
                type="radio"
                id="theater"
                onChange={onChangeTheater}
                value={`${data.name}`}
                label={`${data.name} - ${data.address} ${data.city}`}
              />
            ))}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={onClickPayment}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default Carts;
