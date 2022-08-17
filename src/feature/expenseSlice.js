import { createSlice } from '@reduxjs/toolkit'
import {nanoid} from 'nanoid';

//Redux toolkit syntax
//Name defines the name in the store, initial state initializes the value and reducers are the actions that can manipulate the value
//Actions are defined by types, using the name as the first thing then a / to define the action. ie. counter/increment
//Reducers are pure functions - output is only determined by the input
//They never change state or action

export const expenseSlice = createSlice({
    name: 'expenses',
    initialState: [],
    reducers: {
        addExpense: {
            reducer: (state, action) => {
                //destructuring to work easily with values
                const {id, createdAt, description, note, amount} = action.payload;
                const expense = {
                    id: id,
                    description: description,
                    note: note,
                    amount: amount,
                    createdAt: createdAt
                };
                state.push(expense);
            },
            //We prepare the elements to work on
            prepare: (expense) => {
                //We generate an ID
                const id = nanoid();
                //We grab the elements sent to the reducer. We also prepare default values
                const {description = "No description", note = "No note", amount = 0, createdAt = 0} = expense;
                return {payload: {id, createdAt, description, note, amount, createdAt}};
            }
        },
        removeExpense: (state, {payload}) => {
            //We filter the element with the corresponding ID
            return state.filter(({id}) => id !== payload);
        },
        editExpense: (state, {payload}) => {
            return state.map( (expense) => {
                if(expense.id === payload.id){
                    return {...expense, ...payload.updates};
                }
                else{
                    return expense;
                }
            });
        }
    }
});

export const {addExpense, removeExpense, editExpense, expensesTotal} = expenseSlice.actions;

export default expenseSlice.reducer;