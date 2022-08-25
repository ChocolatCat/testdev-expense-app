import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import db, {app} from '../firebase/firebase';
import { ref, push } from 'firebase/database';

//Thunk syntax for async functions
export const addExpense = createAsyncThunk('expenses/addExpense', 
async (expense = {}, thunkAPI) => {
    const {description = "No description", note = "No note", amount = 0, createdAt = 0} = expense;
    const expenseData = {description, note, amount, createdAt};
    const newExpense = push(ref(db, 'expenses'), expenseData);
    return {id: newExpense.key, ...expenseData};
});

//Redux toolkit syntax
//Name defines the name in the store, initial state initializes the value and reducers are the actions that can manipulate the value
//Actions are defined by types, using the name as the first thing then a / to define the action. ie. counter/increment
//Reducers are pure functions - output is only determined by the input
//They never change state or action

export const expenseSlice = createSlice({
    name: 'expenses',
    initialState: [],
    reducers: {
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
    },
    extraReducers: (builder) => {
        builder.addCase(addExpense.fulfilled, (state, { payload }) => {
            state.push(payload);
        }),
        builder.addCase(addExpense.rejected, (state, { payload }) => {
            console.log('Tasukete!');
        })
    }
});

export const { removeExpense, editExpense } = expenseSlice.actions;

export default expenseSlice.reducer;