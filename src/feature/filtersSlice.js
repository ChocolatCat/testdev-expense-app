import { createSlice } from '@reduxjs/toolkit'
import { startOfMonth, lastDayOfMonth } from 'date-fns';

//Redux toolkit syntax
//Name defines the name in the store, initial state initializes the value and reducers are the actions that can manipulate the value
//Actions are defined by types, using the name as the first thing then a / to define the action. ie. counter/increment
//Reducers are pure functions - output is only determined by the input
//They never change state or action

const filtersSlice = createSlice({
    name: 'filters',
    initialState: {
        text: '',
        sortBy: 'date',
        startDate: Date.parse(startOfMonth(Date.now())),
        endDate: Date.parse(lastDayOfMonth(Date.now()))
    },
    reducers: {
        setTextFilter: (state, action) => {
            state.text = action.payload ? action.payload : "";
        },
        sortByDate: (state) => {
            state.sortBy = 'date';
        },
        sortByAmount: (state) => {
            state.sortBy = 'amount';
        },
        setStartDate: (state, action) => {
            state.startDate = action.payload;
        },
        setEndDate: (state, action) => {
            state.endDate = action.payload;
        }
    }
});

export const {setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate} = filtersSlice.actions;

export default filtersSlice.reducer;