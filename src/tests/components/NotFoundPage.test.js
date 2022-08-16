/** @jest-environment jsdom */

import React from 'react';
import { render, screen } from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import NotFoundPage from '../../components/NotFoundPage';

it('Should render NotFoundPage', () => {
    const {asFragment} = render(
        <BrowserRouter>
            <NotFoundPage />
        </BrowserRouter>
    );
    expect(asFragment()).toMatchSnapshot();
});