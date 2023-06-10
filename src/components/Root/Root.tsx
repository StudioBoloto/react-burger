import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import store from "../../services/store";
import {AppHeader} from "../AppHeader/AppHeader";
import {ModalSwitch} from "../ModalSwitch/ModalSwitch";

const Root = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <AppHeader/>
                <ModalSwitch/>
            </BrowserRouter>
        </Provider>
    );
};

export default Root;
