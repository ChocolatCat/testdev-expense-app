/** @jest-environment jsdom */

import React from 'react';
import {render, fireEvent, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import AddExpensePage from '../../components/AddExpensePage';
import appStore from '../../store/appStore';

//Mocks nanoid module because it's imported and used
jest.mock("nanoid", () => {
  return { nanoid: () => "1234" };
});

//mock navigate
const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
}));

//We reset mocked navigate
beforeEach(() => {
  mockedUsedNavigate.mockReset();
});

jest.useFakeTimers().setSystemTime(new Date(2022, 7, 10, 8));

it('Should render without crashing', () => {
    //Must be in a provider to have a store. Must be in a router to use navigate
    const store = appStore();
    const {asFragment} = render(
        <Provider store={store}>
            <BrowserRouter>
                <AddExpensePage />
            </BrowserRouter>
        </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
});

it('Should handle onSubmit', () => {
    const store = appStore();
    const {getByRole, getByPlaceholderText} = render(
        <Provider store={store}>
            <BrowserRouter>
                <AddExpensePage onSubmit={mockedUsedNavigate} />
            </BrowserRouter>
        </Provider>
    );
    //We fill the inputs
    fireEvent.change(getByPlaceholderText('Description'), {target: {value:"Renta"}});
    fireEvent.change(getByPlaceholderText('Amount'), {target: {value:"99999"}});
    fireEvent.change(getByPlaceholderText(/Add a note/i), {target: {value:"Bruh"}});
    fireEvent.submit(getByRole('form'));
    //We check if navigation was done
    expect(mockedUsedNavigate).toBeCalledTimes(1);
    expect(store.getState().expenses[0]).toEqual({
        description: 'Renta',
        amount: 99999,
        note: 'Bruh',
        createdAt: 1660132800000,
        id: '1234'
    });
});