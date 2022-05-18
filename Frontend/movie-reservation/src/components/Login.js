import React from 'react'
import '../asset/css/Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import axios from "axios";

const defaultState = {
    name: null,
    email: null,
    password: null,
    nameError: null,
    emailError: null,
    passwordError: null
}

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        var value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    validate() {
        let nameError = "";
        let emailError = "";
        let passwordError = "";
        if (!this.state.name) {
            nameError = "Name field is required";
        }
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!this.state.email || reg.test(this.state.email) === false) {
            emailError = "Email Field is Invalid ";
        }
        if (!this.state.password) {
            passwordError = "Password field is required";
        }
        if (emailError || nameError || passwordError) {
            this.setState({nameError, emailError, passwordError});
            return false;
        }
        return true;
    }

    submit() {
        if (this.validate()) {
            console.warn(this.state);
            this.setState(defaultState);
        }
    }
    handleClick(event){
        var apiBaseUrl = "http://localhost:8081/user/";
        var self = this;
        var payload={
            "email":this.state.username,
            "password":this.state.password
        }
        axios.post(apiBaseUrl+'login', payload)
            .then(function (response) {
                console.log(response);
                if(response.data.code == 200){
                    console.log("Login successfull");
                }
                else if(response.data.code == 204){
                    console.log("Username password do not match");
                    alert("username password do not match")
                }
                else{
                    console.log("Username does not exists");
                    alert("Username does not exist");
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    routeChange() {
        window.location.href = '/register'
    }

    render() {
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
                                            <h3 class="login-heading mb-4">Welcome To X-trem Movie Hub</h3>


                                            <form>
                                                <div class="form-floating mb-3">
                                                    <input type="email"
                                                           className={"form-control " + (this.state.emailError ? 'invalid' : '')}
                                                           id="floatingInput" name='email'
                                                           placeholder="name@example.com" value={this.state.email}
                                                           onChange={(event, newValue) => this.setState({username: newValue})}
                                                    />
                                                    <label for="floatingInput">Email address</label>
                                                    <span className="text-danger">{this.state.emailError}</span>
                                                </div>
                                                <div class="form-floating mb-3">
                                                    <input type="password"
                                                           className={"form-control " + (this.state.passwordError ? 'invalid' : '')}
                                                           id="floatingPassword" name="password" placeholder="Password"
                                                           value={this.state.password}
                                                           onChange={(event, newValue) => this.setState({password: newValue})}
                                                    />
                                                    <label for="floatingPassword">Password</label>
                                                    <span className="text-danger">{this.state.passwordError}</span>
                                                </div>

                                                <div class="form-check mb-3">
                                                    <input class="form-check-input" type="checkbox" value=""
                                                           id="rememberPasswordCheck"/>
                                                    <label class="form-check-label" for="rememberPasswordCheck">
                                                        Remember password
                                                    </label>
                                                </div>

                                                <div class="d-grid">
                                                    <button
                                                        class="btn btn-lg btn-primary btn-login text-uppercase fw-bold mb-2"
                                                        type="button" onClick={() => this.submit()}>Sign in
                                                    </button>
                                                    <button
                                                        class="btn btn-lg btn-primary btn-login text-uppercase fw-bold mb-2"
                                                        type="button" onClick={(event) => this.handleClick(event)}>Create Account
                                                    </button>
                                                    <div class="text-center">
                                                        <a class="small" href="#">Forgot password?</a>
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
        )
    }
}

export default Login;
