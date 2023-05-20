import {Routes, Route, useLocation} from 'react-router-dom';
import {App} from '../App/App';
import {IngredientDetailsWrapper} from '../IngredientDetailsWrapper/IngredientDetailsWrapper';
import React from 'react';
import {ProtectedRouteElement} from "../ProtectedRouteElement/ProtectedRouteElement";
import {Login} from "../../pages/Login/Login";
import {Register} from "../../pages/Register/Register";
import {ForgotPassword} from "../../pages/ForgotPassword/ForgotPassword";
import {ResetPassword} from "../../pages/ResetPassword/ResetPassword";
import {Profile} from "../../pages/Profile/Profile";
import {NotFound404} from "../../pages/NotFound404/NotFound404";

export const ModalSwitch = () => {
    const location = useLocation();
    const background = location.state?.background;

    return (
        <>
            <Routes location={background || location}>
                <Route path="/" element={<App/>}/>
                <Route path="/ingredients/:id" element={<IngredientDetailsWrapper/>}/>
                <Route
                    path="/login"
                    element={<ProtectedRouteElement element={Login} anonymous={true}/>}
                />
                <Route
                    path="/register"
                    element={<ProtectedRouteElement element={Register} anonymous={true}/>}
                />
                <Route
                    path="/forgot-password"
                    element={<ProtectedRouteElement element={ForgotPassword} anonymous={true}/>}
                />
                <Route
                    path="/reset-password"
                    element={<ProtectedRouteElement element={ResetPassword} anonymous={true}/>}
                />
                <Route
                    path="/profile"
                    element={<ProtectedRouteElement element={Profile} anonymous={false}/>}
                />
                <Route path="*" element={<NotFound404/>}/>
            </Routes>
            {background &&
                (<Routes>
                        <Route path="/ingredients/:id" element={<IngredientDetailsWrapper/>}/>
                    </Routes>
                )
            }
        </>
    );
};

