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
import {OrdersInfoWrapper} from "../OrdersInfoWrapper/OrdersInfoWrapper";
import {Feed} from "../../pages/Feed/Feed";
import {OrdersHistory} from "../../pages/OrdersHistory/OrdersHistory";

export const ModalSwitch = () => {
    const location = useLocation();
    const background = location.state?.background;

    return (
        <>
            <Routes location={background || location}>
                <Route path="/" element={<App/>}/>
                <Route path="/ingredients/:id" element={<IngredientDetailsWrapper/>}/>
                <Route path="/feed/:id" element={<OrdersInfoWrapper/>}/>
                <Route path="/profile/orders/:id" element={<OrdersInfoWrapper/>}/>

                <Route
                    path="/login"
                    element={<ProtectedRouteElement element={Login} anonymous={true}
                                                    previousPath={location.state?.from || '/'}/>}
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

                <Route path="/feed" element={<Feed/>}/>
                <Route
                    path="/profile"
                    element={<ProtectedRouteElement element={Profile} anonymous={false}/>}
                />
                <Route
                    path="/profile/orders"
                    element={<ProtectedRouteElement element={OrdersHistory} anonymous={false}/>}
                />
                <Route path="*" element={<NotFound404/>}/>
            </Routes>
            {background &&
                (<Routes>
                        <Route path="/ingredients/:id" element={<IngredientDetailsWrapper/>}/>
                        <Route path="/feed/:id" element={<OrdersInfoWrapper/>}/>
                        <Route path="/profile/orders/:id" element={<OrdersInfoWrapper/>}/>
                    </Routes>
                )
            }
        </>
    );
};

