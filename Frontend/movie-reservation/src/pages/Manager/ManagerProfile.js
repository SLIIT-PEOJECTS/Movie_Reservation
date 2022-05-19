/*
  Created by - Isuru Pathum Herath
  Name - Manager Profile
*/

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { useParams } from "react-router-dom";
import './ManagerProfile.css';
import { getToken } from '../../Services/SessionManager';
import Navbar from '../../components/dashboard/Navbar';
import Sidebar from '../../components/dashboard/Sidebar';

const ManagerProfile = props => {

    // state
    const [manager, setManager] = useState([]);

    const { id } = useParams();

    useEffect(() => {

        axios
            .get(`http://localhost:8081/manager/${id}`, {
                headers: {
                    'Authorization': `Bearer ${getToken()}`
                }
            })
            .then(response => {
                console.log(response)
                setManager(response.data)
            })
            .catch(error => alert('Error Loading Manager Details'));

        var date = manager.DOB;
        var momentDate = moment.utc(date).format('MM/DD/YYYY');
        console.log(momentDate);

    }, []);

    return (
        <div>
            <Navbar />
            <Sidebar />

            <div className="container " style={{ marginLeft: "90px", position: "absolute" }}>
                <div className="card scrollable-div" style={{ width: "1240px", height: "590px" }}>
                    <div className="container card bg-light " >
                        <div className="card-body ">
                            <h1 align="center ">{manager.firstName}'s Profile</h1><br />
                            <div className="main-body ">
                                {/* <nav aria-label="breadcrumb" className="main-breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                        <li className="breadcrumb-item"><a href="javascript:void(0)">User</a></li>
                        <li className="breadcrumb-item active" aria-current="page">User Profile</li>
                    </ol>
                </nav> */}

                                <div className="row gutters-sm">
                                    <div className="col-md-4 mb-3">
                                        <div className="card border-success">
                                            <div className="card-body">
                                                <div className="d-flex flex-column align-items-center text-center">
                                                    <img src={manager.profileURL} alt="PROFILE PICTURE NOT AVAILABLE" className="rounded-circle" width="150" />
                                                    <div className="mt-3">
                                                        <h4>{manager.firstName + ' ' + manager.lastName}</h4>
                                                        <p className="text-secondary mb-1">{manager.type}</p>
                                                        <p className="text-muted font-size-sm">{manager.address}</p>
                                                        {/* <button className="btn btn-info">Follow</button> <br/> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="card mt-3">
                                            <ul className="list-group list-group-flush">
                                                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                    <h6 className="mb-0">Account Status</h6>
                                                    <span className="text-success">{manager.accountStatus}</span>
                                                </li>
                                                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                    <h6 className="mb-0">Username</h6>
                                                    <span className="text-success">{manager.email}</span>
                                                </li>
                                                <br />
                                                <div className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                    <div className="col-sm-12">
                                                        <a className="btn btn-info" style={{ width: "100%" }} href={`/update-profile/${id}`}>Edit</a>
                                                    </div>
                                                </div>


                                                {/* <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                    <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-globe mr-2 icon-inline"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>Website</h6>
                                    <span className="text-secondary">https://bootdey.com</span>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                    <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-github mr-2 icon-inline"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>Github</h6>
                                    <span className="text-secondary">bootdey</span>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                    <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-twitter mr-2 icon-inline text-info"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>Twitter</h6>
                                    <span className="text-secondary">@bootdey</span>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                    <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-instagram mr-2 icon-inline text-danger"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>Instagram</h6>
                                    <span className="text-secondary">bootdey</span>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                    <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-facebook mr-2 icon-inline text-primary"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>Facebook</h6>
                                    <span className="text-secondary">bootdey</span>
                                </li> */}
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="col-md-8">
                                        <div className="card mb-3">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-sm-3">
                                                        <h6 className="mb-0">Manager ID</h6>
                                                    </div>
                                                    <div className="col-sm-9 text-blue">
                                                        {manager.employeeId}
                                                    </div>
                                                </div>
                                                <hr />
                                                <div className="row">
                                                    <div className="col-sm-3">
                                                        <h6 className="mb-0">Full Name</h6>
                                                    </div>
                                                    <div className="col-sm-9 text-blue">
                                                        {manager.firstName + ' ' + manager.middleName + ' ' + manager.lastName}
                                                    </div>
                                                </div>
                                                <hr />
                                                <div className="row">
                                                    <div className="col-sm-3">
                                                        <h6 className="mb-0">Email</h6>
                                                    </div>
                                                    <div className="col-sm-9 text-blue">
                                                        {manager.email}
                                                    </div>
                                                </div>
                                                <hr />
                                                <div className="row">
                                                    <div className="col-sm-3">
                                                        <h6 className="mb-0">Mobile Number</h6>
                                                    </div>
                                                    <div className="col-sm-9 text-blue">
                                                        {manager.mobileNumber}
                                                    </div>
                                                </div>
                                                <hr />
                                                <div className="row">
                                                    <div className="col-sm-3">
                                                        <h6 className="mb-0">Address</h6>
                                                    </div>
                                                    <div className="col-sm-9 text-blue">
                                                        {manager.address}
                                                    </div>
                                                </div>
                                                <hr />
                                                <div className="row">
                                                    <div className="col-sm-3">
                                                        <h6 className="mb-0">Birthday</h6>
                                                    </div>
                                                    <div className="col-sm-9 text-blue">
                                                        {moment.utc(manager.DOB).format('MM/DD/YYYY')}
                                                    </div>
                                                </div>
                                                <hr />
                                                <div className="row">
                                                    <div className="col-sm-3">
                                                        <h6 className="mb-0">NIC</h6>
                                                    </div>
                                                    <div className="col-sm-9 text-blue">
                                                        {manager.nic}
                                                    </div>
                                                </div>
                                                <hr />
                                                <div className="row">
                                                    <div className="col-sm-3">
                                                        <h6 className="mb-0">Account Status</h6>
                                                    </div>
                                                    <div className="col-sm-9 text-blue">
                                                        {manager.accountStatus}
                                                    </div>
                                                </div>
                                                <hr />
                                                <div className="row">
                                                    <div className="col-sm-3">
                                                        <h6 className="mb-0">Added At</h6>
                                                    </div>
                                                    <div className="col-sm-9 text-blue">
                                                        {moment(manager.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
                                                    </div>
                                                </div>
                                                <hr />
                                                <div className="row">
                                                    <div className="col-sm-3">
                                                        <h6 className="mb-0">Last Update At</h6>
                                                    </div>
                                                    <div className="col-sm-9 text-blue">
                                                        {moment(manager.updatedAt).format('MMMM Do YYYY, h:mm:ss a')}
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
        </div>
    )
}

export default ManagerProfile;