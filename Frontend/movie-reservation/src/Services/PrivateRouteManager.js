/*
    Created by - Isuru Pathum Herath
    Name - Private Route
 */

import React from 'react';

import { Navigate, Outlet } from 'react-router-dom'
import { getUser } from './SessionManager';

const ProtectedRoutes = () => {

    const auth = getUser()
    return auth ? <Outlet /> : <Navigate to="/home" />
}

export default ProtectedRoutes;