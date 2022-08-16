/** @jest-environment jsdom */

import React from 'react';
import {render, fireEvent, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import EditExpensePage from '../../components/EditExpensePage';
import appStore from '../../store/appStore';
import {expenses} from '../fixtures/expenses';
import {addExpense} from '../../feature/expenseSlice';

//Mocks nanoid module because it's imported and used
jest.mock("nanoid", () => {
  return { nanoid: () => "1234" };
});

//mock navigate
const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
    useParams: () => ({
        id: '1234',
    })
}));

//We reset mocked navigate
beforeEach(() => {
  mockedUsedNavigate.mockReset();
});

jest.useFakeTimers().setSystemTime(new Date(2022, 7, 10, 8));


it('Should render without crashing', () => {
    //Must be in a provider to have a store. Must be in a router to use navigate
    const store = appStore();
    store.dispatch(addExpense(expenses[0]));
    const {asFragment} = render(
        <Provider store={store}>
            <BrowserRouter>
                <EditExpensePage />
            </BrowserRouter>
        </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
});

it('Should submit to edit expense', () => {
    const store = appStore();
    store.dispatch(addExpense(expenses[0]));
    const {getByRole, getByPlaceholderText} = render(
        <Provider store={store}>
            <BrowserRouter>
                <EditExpensePage onSubmit={mockedUsedNavigate} />
            </BrowserRouter>
        </Provider>
    );
    fireEvent.change(getByPlaceholderText('Description'), {target: {value:"Renta"}});
    fireEvent.submit(getByRole('form'));
    expect(mockedUsedNavigate).toBeCalledTimes(1);
    expect(store.getState().expenses[0].description).toBe("Renta");
});

it('Should handle remove expense', () => {
    const store = appStore();
    store.dispatch(addExpense(expenses[0]));
    const {getByRole, getByText} = render(
        <Provider store={store}>
            <BrowserRouter>
                <EditExpensePage onSubmit={mockedUsedNavigate} />
            </BrowserRouter>
        </Provider>
    );
    fireEvent.click(getByText('Remove'));
    expect(mockedUsedNavigate).toBeCalledTimes(1);
    expect(store.getState().expenses).toEqual([]);
});