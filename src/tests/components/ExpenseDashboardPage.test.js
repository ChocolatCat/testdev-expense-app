/** @jest-environment jsdom */

import React from 'react';
import {Provider} from 'react-redux';
import { render, screen } from '@testing-library/react';
import appStore from '../../store/appStore';
import ExpenseDashboardPage from '../../components/ExpenseDashboardPage';

const store = appStore();

//Mocks nanoid module because it's imported and used
jest.mock("nanoid", () => {
  return { nanoid: () => "1234" };
});

it('Should render ExpenseDashboardPage', () => {
    const {asFragment} = render(
        <Provider store={store}>
            <ExpenseDashboardPage />
        </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
});