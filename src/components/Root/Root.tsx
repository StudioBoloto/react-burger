import React from 'react';
import {Provider} from 'react-redux';
import store from "../../services/reducers/store";
import {App} from '../App/App';

const Root = () => (
    <Provider store={store}>
        <App/>
    </Provider>
);

export default Root;
