import { React, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import "../asset/css/Cart.css";
import { Cart } from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import { TrashFill } from "react-bootstrap-icons";
import { Button, Modal, Form,} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import QRCode from "qrcode.react";

function Carts() {
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
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
                              src="https://wallpapercave.com/wp/wp4399797.jpg"
                              class="img-sm"
                              style={{ width: "3rem" }}
                            />
                          </div>
                          <figcaption class="info">
                            <a href="#" class="title text-dark">
                              Some name of item goes here nice
                            </a>
                            <p class="text-muted small">
                              description and details <br /> goes here
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
                  <a href="#" class="btn btn-primary float-md-right">
                    {" "}
                    Make Purchase <i class="fa fa-chevron-right"></i>{" "}
                  </a>
                  <a href="#" class="btn btn-light" onClick={() => {navigate(`/home`);}}>
                    {" "}
                    <i class="fa fa-chevron-left"></i> Continue shopping{" "}
                  </a>
                </div>
              </div>

              <div class="alert alert-success mt-3">
                <span>
                <p class="icontext">
                  <i class="icon text-success fa fa-truck"></i> Happy Movie Hour
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
                        value={"hello manul"}
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
                  <p class="text-center mb-3">
                    <img
                      src="https://flyclipart.com/thumb2/paypal-credit-card-logos-png-672268.png"
                      height="26"
                    />
                  </p>
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
          <Modal.Title><h2>Select Your Movie Session</h2></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            BrowserRouter
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
}
export default Carts;
