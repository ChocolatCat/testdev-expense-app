/** @jest-environment jsdom */

import React from 'react';
import ExpensesSummary from '../../components/ExpensesSummary';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {expenses} from '../fixtures/expenses';
import appStore from '../../store/appStore';
import { addExpense } from '../../feature/expenseSlice';

//Mocks nanoid module because it's imported and used
jest.mock("nanoid", () => {
  return { nanoid: () => "1234" };
});

it('Should render with 1 expense added', () => {
    const store = appStore();
    const component = (
        <Provider store={store}>
            <ExpensesSummary expensesCount={1} expensesTotal={10}/>
        </Provider>
    );
    const {asFragment} = render(component);
    expect(asFragment()).toMatchSnapshot();
});

it('Should render with multiple expenses added', () => {
    const store = appStore();
    const component = (
        <Provider store={store}>
            <ExpensesSummary expensesCount={3} expensesTotal={50010} />
        </Provider>
    );
    const {asFragment} = render(component);
    expect(asFragment()).toMatchSnapshot();
});