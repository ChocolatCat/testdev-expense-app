/** @jest-environment jsdom */

import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import ExpenseForm from '../../components/ExpenseForm';
import { expenses } from '../fixtures/expenses';

//require.requireActual to ask for the real library

jest.useFakeTimers().setSystemTime(new Date(2022, 7, 10, 8));


it('Should render ExpenseForm', () => {
    const {asFragment} = render(
        <ExpenseForm />
    );
    expect(asFragment()).toMatchSnapshot();
});

it('Should render ExpenseForm with data', () => {
    const {asFragment} = render(
        <ExpenseForm expense={expenses[1]}/>
    );
    expect(asFragment()).toMatchSnapshot();
});

it('Should render error for invalid form submission', () => {
    const {getByRole, getByText} = render(
        <ExpenseForm />
    );
    fireEvent.submit(getByRole('form'));
    expect(getByText("Please provide a description and amount!")).toBeInTheDocument();
});

it('Should set description on input change', () => {
    const {getByPlaceholderText} = render(
        <ExpenseForm />
    );
    const description = getByPlaceholderText("Description");
    fireEvent.change(description, {target: {value:"Todokete"}});
    expect(description.value).toBe("Todokete");
});

it('Should set note on textarea change', () => {
    const {getByPlaceholderText} = render(
        <ExpenseForm />
    );
    const note = getByPlaceholderText("Add a note to this expense! (optional)");
    fireEvent.change(note, {target: {value:"Todokete"}});
    expect(note.value).toBe("Todokete");
});

it('Should set amount to valid input', () => {
    const {getByPlaceholderText} = render(
        <ExpenseForm />
    );
    const amount = getByPlaceholderText("Amount");
    fireEvent.change(amount, {target: {value:"12345"}});
    expect(amount.value).toBe("12345");
});

it('Should not set amount to invalid input', () => {
    const {getByPlaceholderText} = render(
        <ExpenseForm />
    );
    const amount = getByPlaceholderText("Amount");
    fireEvent.change(amount, {target: {value:"5a2"}});
    expect(amount.value).toBe("");
});

it('should call onSubmit prop for valid form submission', () => {
    const onSubmitSpy = jest.fn(); //We create a spy
    const {getByRole} = render(
        <ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy}/>
    );
    fireEvent.submit(getByRole('form'));
    expect(onSubmitSpy).toHaveBeenCalledWith({
        description: expenses[0].description,
        amount: expenses[0].amount,
        note: expenses[0].note,
        createdAt: expenses[0].createdAt
    });
});

it('should call onDateChange', ()=> {
    const onSubmitSpy = jest.fn(); //We create a spy
    const {getAllByRole} = render(
        <ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy}/>
    );
    const datePicker = getAllByRole('textbox')[2];
    fireEvent.mouseDown(datePicker);
    //american date
    fireEvent.change(datePicker, { target: { value: "12-15-2022" } });
    //formated date
    expect(datePicker.value).toBe('15/12/2022');
});