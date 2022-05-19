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
                                                        <h6 className="mb-0">Passowrd</h6>
                                                    </div>
                                                    <div className="col-sm-9 text-blue">
                                                        {manager.password}
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