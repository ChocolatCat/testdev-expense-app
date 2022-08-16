/** @jest-environment jsdom */
import React from 'react';
import {render, fireEvent, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import ExpenseListFilters from '../../components/ExpenseListFilters';
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

jest.useFakeTimers().setSystemTime(new Date(2022, 7, 10));

it('Should render the filters without crashing', () => {
    //Must be in a provider to have a store. 
    const store = appStore();
    const {asFragment} = render(
        <Provider store={store}>
            <ExpenseListFilters />
        </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
});

it('Should set text filter', () => {
    const store = appStore();
    const {getByPlaceholderText} = render(
        <Provider store={store}>
            <ExpenseListFilters />
        </Provider>
    );
    const textFilter = getByPlaceholderText(/Filter by Text/i);
    fireEvent.change(textFilter, {target: {value:"Anime"}});
    expect(store.getState().filters.text).toBe('Anime');
});

it('Should set sortby to amount', () => {
    const store = appStore();
    const {getByRole} = render(
        <Provider store={store}>
            <ExpenseListFilters />
        </Provider>
    );
    const sortBy = getByRole('combobox');
    fireEvent.change(sortBy, {target:{value: 'amount'}});
    expect(store.getState().filters.sortBy).toBe('amount');
});

it('Should set sortby to date', () => {
    const store = appStore();
    const {getByRole} = render(
        <Provider store={store}>
            <ExpenseListFilters />
        </Provider>
    );
    const sortBy = getByRole('combobox');
    fireEvent.change(sortBy, {target:{value: 'date'}});
    expect(store.getState().filters.sortBy).toBe('date');
});

it('Should set start date', () => {
    const store = appStore();
    const {getAllByRole} = render(
        <Provider store={store}>
            <ExpenseListFilters />
        </Provider>
    );
    const startDate = getAllByRole('textbox')[1];
    fireEvent.mouseDown(startDate);
    fireEvent.change(startDate, {target:{value: '08-11-2022'}});
    expect(store.getState().filters.startDate).toBe(1660190400000);
});

it('Should set end date', () => {
    const store = appStore();
    const {getAllByRole} = render(
        <Provider store={store}>
            <ExpenseListFilters />
        </Provider>
    );
    const endDate = getAllByRole('textbox')[2];
    fireEvent.mouseDown(endDate);
    fireEvent.change(endDate, {target:{value: '08-14-2022'}});
    expect(store.getState().filters.endDate).toBe(1660535999000);
});