/*
    Created by - Isuru Pathum Herath
    Name - Sidebar
 */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { logout } from '../../Services/SessionManager';
import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarFooter,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';
import { getUser, getToken } from '../../Services/SessionManager';

const Sidebar = () => {

    const [manager, setManager] = useState([]);
    const [state, setState] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        mobileNumber: '',
        email: '',
        DOB: '',
        nic: '',
        address: '',
        type: '',
        id: '',
        accountStatus: ""
    });

    //destructure values from state
    const { firstName, middleName, lastName, mobileNumber, email, DOB, nic, address, type, accountStatus } = state;

    const logoutFromSession = () => {
        swal({
            title: "Are you sure?",
            text: "Do you want to logout!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    swal("Loging out", {
                        icon: "success",
                    });
                    logout();
                    window.location.href = `/admin-login`;
                } else {
                    swal("Stay in Session!");
                }
            });
    }

    const errorMessage = () => {
        swal("You don't have permission!", {
            buttons: false,
            timer: 3000,
        });
    }

    useEffect(() => {
        axios
            .get(`http://localhost:8081/manager/${getUser()}`, {
                headers: {
                    'Authorization': `Bearer ${getToken()}`
                }
            })
            .then(response => {
                console.log(response)
                const { firstName, middleName, lastName, mobileNumber, email, DOB, nic, address, type, accountStatus, profileURL } = response.data
                setState({ ...state, firstName, middleName, lastName, mobileNumber, email, DOB, nic, address, type, accountStatus });
                console.log(type)
            })
            .catch(error => alert('Error Loading Update Manager'));
    }, []);

    const isAdmin = () => {
        console.log("Type: " + type);
        if (type == "admin") {
            return true;
        } else {
            return false;
        }
    }

    return (
        <div style={{ position: 'absolute', display: 'flex', height: '100vh' }}>
            <CDBSidebar textColor="#fff" backgroundColor="#333">
                <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
                    <a href="/movie" className="text-decoration-none" style={{ color: 'inherit' }}>
                        X-trem Movie Hub
                    </a>
                </CDBSidebarHeader>

                <CDBSidebarContent className="sidebar-content">
                    <CDBSidebarMenu>
                        <NavLink exact to="/movie" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="columns">Movie</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink exact to="/theater" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="table">Theater</CDBSidebarMenuItem>
                        </NavLink>

                        <div>
                            {type == "admin" ? (
                                <NavLink exact to="/manager" activeClassName="activeClicked">
                                    <CDBSidebarMenuItem icon="user">Manager</CDBSidebarMenuItem>
                                </NavLink>
                            ) : (
                                <NavLink onClick={() => errorMessage()} exact to="#" activeClassName="activeClicked">
                                    <CDBSidebarMenuItem icon="user">Manager</CDBSidebarMenuItem>
                                </NavLink>
                            )}
                        </div>

                        <NavLink exact to="/analytics" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="chart-line">Analytics</CDBSidebarMenuItem>
                        </NavLink>

                        <NavLink onClick={() => logoutFromSession()} exact to="#" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="exclamation-circle">Logout</CDBSidebarMenuItem>
                        </NavLink>
                    </CDBSidebarMenu>
                </CDBSidebarContent>

                <CDBSidebarFooter style={{ textAlign: 'center' }}>
                    <div
                        style={{
                            padding: '20px 5px',
                        }}
                    >
                    </div>
                </CDBSidebarFooter>
            </CDBSidebar>
        </div>
    );
};

export default Sidebar;