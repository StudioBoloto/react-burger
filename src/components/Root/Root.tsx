import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import store from "../../services/reducers/store";
import {App} from '../App/App';
import {Login} from '../../pages/Login/Login';
import {Register} from '../../pages/Register/Register';
import {ForgotPassword} from '../../pages/ForgotPassword/ForgotPassword';
import {ResetPassword} from '../../pages/ResetPassword/ResetPassword';
import {Profile} from '../../pages/Profile/Profile';
import {NotFound404} from '../../pages/NotFound404/NotFound404';
import {IngredientDetailsWrapper} from "../IngredientDetailsWrapper/IngredientDetailsWrapper";
import {ProtectedRouteElement} from "../ProtectedRouteElement/ProtectedRouteElement";
import {UnprotectedRouteElement} from "../UnprotectedRoute/UnprotectedRoute";


const Root = () => {
    const isModal = localStorage.getItem("modalOpen") === "true";

    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App/>}>
                        {isModal && <Route path="/ingredients/:id" element={<IngredientDetailsWrapper/>}/>}
                    </Route>
                    {!isModal && <Route path="/ingredients/:id" element={<IngredientDetailsWrapper/>}/>}
                    <Route
                        path="/login"
                        element={<UnprotectedRouteElement element={<Login/>}/>}
                    />
                    <Route
                        path="/register"
                        element={<UnprotectedRouteElement element={<Register/>}/>}
                    />
                    <Route
                        path="/forgot-password"
                        element={<UnprotectedRouteElement element={<ForgotPassword/>}/>}
                    />
                    <Route
                        path="/reset-password"
                        element={<UnprotectedRouteElement element={<ResetPassword/>}/>}
                    />
                    <Route
                        path="/profile"
                        element={<ProtectedRouteElement element={<Profile/>}/>}
                    />
                    <Route path="*" element={<NotFound404/>}/>
                </Routes>
            </BrowserRouter>
        </Provider>
    );
};

export default Root;
