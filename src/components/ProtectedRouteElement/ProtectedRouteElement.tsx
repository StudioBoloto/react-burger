import {Navigate, useLocation} from 'react-router-dom';
import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../services/reducers/store";

interface ProtectedRouteElementProps {
    element: React.ComponentType<any>;
    anonymous?: boolean;
}

export function ProtectedRouteElement({element: Component, anonymous = false}: ProtectedRouteElementProps) {
    const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
    const location = useLocation();

    if (anonymous && isLoggedIn) {
        return <Navigate to="/"/>;
    }

    if (!anonymous && !isLoggedIn) {
        return <Navigate to="/login" state={{from: location}}/>;
    }

    return <Component/>;
}
