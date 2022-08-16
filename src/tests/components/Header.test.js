/** @jest-environment jsdom */
import React from 'react';
import Header from '../../components/Header';
import {render, screen} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';

//ALL ELEMENTS USING AN ELEMENT FORM REACT ROUTER NEED A ROUTER

it('renders Header without crashing and find the title', () => {
    const component = (
        <BrowserRouter>
            <Header />
        </BrowserRouter>
    );
    render(component);
    expect(screen.getByText("Expense App!")).toBeInTheDocument();
});

it('renders as snapshot', () => {
    const {asFragment} = render(
        <BrowserRouter>
            <Header />
        </BrowserRouter>
    );
    expect(asFragment()).toMatchSnapshot();
});