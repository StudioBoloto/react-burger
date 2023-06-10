import {Navigate, useLocation} from 'react-router-dom';
import React from "react";
import Loader from "../Loader/Loader";
import {useSelector} from "../../services/hooks";

interface ProtectedRouteElementProps {
    element: React.ComponentType<any>;
    anonymous?: boolean;
    previousPath?: string;
}

export function ProtectedRouteElement({
                                          element: Component,
                                          anonymous = false,
                                          previousPath
                                      }: ProtectedRouteElementProps) {
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const loading = useSelector((state) => state.user.loading);
    const location = useLocation();

    if (loading) {
        return (
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
                <Loader/>
            </div>)
    }

    if (anonymous && isLoggedIn) {
        if (previousPath && location.pathname !== previousPath) {
            console.log(`Redirecting to ${previousPath} from ${location.pathname}`);
            return <Navigate to={previousPath} replace={false}/>;
        }
        console.log("Redirecting to /");
        return <Navigate to="/"/>;
    }

    if (!anonymous && !isLoggedIn) {
        console.log(`Redirecting to /login from ${location.pathname}`);
        return <Navigate to="/login" replace={false} state={{from: location.pathname}}/>;
    }

    return <Component/>;
}
