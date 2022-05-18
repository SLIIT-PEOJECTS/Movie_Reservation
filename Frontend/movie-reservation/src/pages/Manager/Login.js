import React, { useState, useEffect } from "react";
import axios from "axios";
import { authenticate, getUser } from '../../Services/SessionManager';

function LoginScreen(props) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [manager, setManager] = useState([])
    const delay = ms => new Promise(res => setTimeout(res, ms));
    const Swal = require('sweetalert2');

    useEffect(() => {
        const id = getUser();
        if (getUser()) {
            window.location.href = `/movie`;
        }
        // getUser() && props.history.push(`/movie`);
    }, []);

    async function Login() {
        // const user = { email, password }
        console.log(email, password);
        axios.post('http://localhost:8081/manager/login', { email, password })
            .then(response => {
                console.log(response)
                if (response.data == null) {
                    Swal.fire({
                        title: 'Login Failed 1111!',
                        text: 'Email or Password incorrect',
                        icon: 'error',
                        confirmButtonText: 'Try again'
                    });
                }
                else {
                    if (response.data.accountStatus == "Pending") {
                        Swal.fire({
                            title: 'Welcome!',
                            text: `User ${response.data.email} Authenticated`,
                            icon: 'success'
                        });
                        setManager(response.data)
                        setTimeout(() => { window.location.href = `/admin-login` }, 3000);
                    }
                    else if (response.data.accountStatus == "Active") {
                        Swal.fire({
                            title: 'Welcome!',
                            text: `User ${response.data.email} Authenticated`,
                            icon: 'success'
                        });
                        setManager(response.data)
                        authenticate(response, () => window.location.href = `/movie`, 3000);

                        // alert("Active Account")
                        //response will contain token and name
                        // authenticate(response, () => props.history.push('/create'));
                        // setTimeout(() => { window.location.href = `/movie` }, 2000);
                    }
                    else {
                        Swal.fire({
                            title: 'Login Failed!',
                            text: 'Email or Password incorrect',
                            icon: 'error',
                            confirmButtonText: 'Try again'
                        });
                    }


                }

            })
            .catch(error => {
                Swal.fire({
                    title: 'Error!',
                    text: 'Login Failed',
                    icon: 'error',
                    confirmButtonText: 'Try again'
                });
            });
    };

    return (

        <div className="container" style={{ marginTop: "5%" }}>
            <div class="card" >
                <div className="card-body">
                    {loading}
                    <div className="row align-items-center justify-content-center" >
                        <div class="col-lg-6">
                            <img src="https://source.unsplash.com/random/?movie" style={{ height: 500, widows: 500 }} class="img-fluid" alt="Doccure Login" />
                        </div>
                        <div className="col-lg-6">
                            <h2 style={{ fontSize: '35px', marginTop: '5px' }}> Staff Login </h2><br />
                            <div>
                                <div className="form-group" style={{ marginBottom: '15px' }}>
                                    <label style={{ marginBottom: '5px' }}>Email</label>
                                    <input required type='email'
                                        className="form-control"
                                        placeholder="Enter Your Email"
                                        value={email}
                                        onChange={(e) => { setEmail(e.target.value) }} />
                                </div>

                                <div className="form-group" style={{ marginBottom: '15px' }}>
                                    <label style={{ marginBottom: '5px' }}>Password</label>
                                    <input required type='password'
                                        className="form-control"
                                        placeholder="Enter Your Password"
                                        value={password}
                                        onChange={(e) => { setPassword(e.target.value) }} />
                                </div><br />



                                <button onClick={Login}
                                    className="btn btn-info btn-block btn-lg login-btn"
                                    style={{ marginTop: '15px' }}><i class="fas fa-sign-in-alt"> Login</i>
                                </button>
                                <br />
                                <br />
                                Want to go <a href="/home">Back to Main Page ?</a>
                                <br />



                            </div>


                        </div>

                    </div>
                </div>
            </div><br /><br /><br />
        </div>
    );
}

export default LoginScreen;