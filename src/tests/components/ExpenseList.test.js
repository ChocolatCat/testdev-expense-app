/** @jest-environment jsdom */

import React from 'react';
import ExpenseList from '../../components/ExpenseList';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {expenses} from '../fixtures/expenses';
import appStore from '../../store/appStore';
import { addExpense } from '../../feature/expenseSlice';
import {BrowserRouter} from 'react-router-dom';

//define the store to test reducers
const store = appStore();
//We add elements to test

store.dispatch(addExpense(expenses[0]));

const emptyStore = appStore();

//Mocks nanoid module because it's imported and used
jest.mock("nanoid", () => {
  return { nanoid: () => "1234" };
});

it('Should render ExpenseList with expenses', () => {
    const component = (
        <Provider store={store}>
            <BrowserRouter>
                <ExpenseList />
            </BrowserRouter>
        </Provider>
    );
    const {asFragment} = render(component);
    expect(asFragment()).toMatchSnapshot();
});

it('Should render ExpenseList with empty message', () => {
    const component = (
        <Provider store={emptyStore}>
            <BrowserRouter>
                <ExpenseList />
            </BrowserRouter>
        </Provider>
    );
    const {asFragment} = render(component);
    expect(asFragment()).toMatchSnapshot();
})