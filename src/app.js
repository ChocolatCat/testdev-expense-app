import React from 'react';
//The import to client is supported. Barebones it's not.
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import AppRouter from './router/AppRouter'
import appStore from './store/appStore';
import { addExpense } from './feature/expenseSlice';

import 'normalize.css/normalize.css';
import './styles/styles.scss';
import "react-datepicker/dist/react-datepicker.css";


const store = appStore();

/*
store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = selectExpenses(state.expenses, state.filters);
    console.log(visibleExpenses);
});
*/

store.dispatch(addExpense({
    description: "Water bill",
    amount: 111,
    createdAt: Date.now()
}));

store.dispatch(addExpense({
    description: "Rent",
    amount: 333,
    createdAt: Date.now() + 999
}));

store.dispatch(addExpense({
    description: "Gas bill",
    amount: 222,
    createdAt: Date.now() - 30
}));


//React 18
const container = document.getElementById("app");
const root = ReactDOM.createRoot(container);
//We wrap a provider for react-redux
const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

root.render(jsx);

/*
REACT 17
ReactDOM.render(<IndecisionApp />, container);
*/