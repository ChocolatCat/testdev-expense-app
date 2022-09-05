import React, { useEffect } from 'react';
//The import to client is supported. Barebones it's not.
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import AppRouter from './router/AppRouter'
import appStore from './store/appStore';

import 'normalize.css/normalize.css';
import './styles/styles.scss';
import "react-datepicker/dist/react-datepicker.css";

const store = appStore();

console.log('gaming');

//React 18
const container = document.getElementById("app");
const root = ReactDOM.createRoot(container);
//We wrap a provider for react-redux

const jsx = (
    <Provider store={store}>
        <AppRouter store={store}/>
    </Provider>
);

root.render(jsx);

