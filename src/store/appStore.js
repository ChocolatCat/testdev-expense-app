import {configureStore} from '@reduxjs/toolkit';
import expenseReducer from '../feature/expenseSlice';
import filtersReducer from '../feature/filtersSlice';
import userReducer from '../feature/userSlice';

export default () => {
    const store = configureStore({
        reducer:{
            expenses: expenseReducer,
            filters: filtersReducer,
            user: userReducer
        }
    });
    return store;
}