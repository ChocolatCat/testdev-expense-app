/** @jest-environment jsdom */

import React from 'react';
import { render, screen } from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import {expenses} from '../fixtures/expenses';
import ExpenseListItem from '../../components/ExpenseListItem';

it('Should render ExpenseListItem', () => {
    const {asFragment} = render(
        <BrowserRouter>
            <ExpenseListItem key={expenses[1].id} {...expenses[1]}/>
        </BrowserRouter>
    );
    expect(asFragment()).toMatchSnapshot();
});