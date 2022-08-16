import {configureStore} from '@reduxjs/toolkit';
import expenseReducer from '../feature/expenseSlice';
import filtersReducer from '../feature/filtersSlice';

export default () => {
    const store = configureStore({
        reducer:{
            expenses: expenseReducer,
            filters: filtersReducer
        }
    });
    return store;
}