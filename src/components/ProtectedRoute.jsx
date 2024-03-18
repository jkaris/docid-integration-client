import React from 'react';
import {Route, Navigate} from 'react-router-dom';

const ProtectedRoute = ({component: Component, isLoggedIn, ...rest}) => {
    return (
        <Route
            {...rest}
            render={(props) =>
                isLoggedIn ? <Component {...props} /> : <Navigate to="/login"/>
            }
        />
    );
};

export default ProtectedRoute;
