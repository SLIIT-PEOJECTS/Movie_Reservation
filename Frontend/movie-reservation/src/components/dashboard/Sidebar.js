/*
    Created by - Isuru Pathum Herath
    Name - Sidebar
 */

import React from 'react';
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
                        <NavLink exact to="/manager" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="user">Manager</CDBSidebarMenuItem>
                        </NavLink>
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
                        @isuru
                    </div>
                </CDBSidebarFooter>
            </CDBSidebar>
        </div>
    );
};

export default Sidebar;