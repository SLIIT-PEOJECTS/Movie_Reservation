/*
    Created by - Isuru Pathum Herath
    Name - Session Manager using Session Storage
 */

//save login response > (user's name and token) to session storage
export const authenticate = (response, next) => {
    if (window !== 'undefined') {
        // console.log('authenticate', response)
        // sessionStorage.setItem('token', JSON.stringify(response.data));
        sessionStorage.setItem('id', JSON.stringify(response.data.id));
    }
    next();
};

//access access name from session storage
export const getToken = () => {
    if (window !== 'undefined') {
        if (sessionStorage.getItem('token')) {
            return JSON.parse(sessionStorage.getItem('token'));
        }
        else {
            return false;
        }
    }
};

//access user's name from session storage
export const getUser = () => {
    if (window !== 'undefined') {
        if (sessionStorage.getItem('id')) {
            return JSON.parse(sessionStorage.getItem('id'));
        }
        else {
            return false;
        }
    }
};


//remove token from session storage
export const logout = next => {
    if (window !== 'undefined') {
        // sessionStorage.removeItem('token');
        sessionStorage.removeItem('id');
    }
    // next();
};