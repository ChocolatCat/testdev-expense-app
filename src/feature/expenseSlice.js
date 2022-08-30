import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import db, {app} from '../firebase/firebase';
import { ref, push, get, remove } from 'firebase/database';

//Thunk syntax for async functions
export const addExpense = createAsyncThunk('expenses/addExpense', 
async (expense = {}, thunkAPI) => {
    const {description = "No description", note = "No note", amount = 0, createdAt = 0} = expense;
    const expenseData = {description, note, amount, createdAt};
    const newExpense = push(ref(db, 'expenses'), expenseData);
    return {id: newExpense.key, ...expenseData};
});

export const removeExpense = createAsyncThunk('expenses/removeExpense', 
async (id, thunkAPI) => {
    await remove(ref(db, 'expenses/'+id));
});

export const setExpenses = createAsyncThunk('expenses/setExpenses', 
async (thunkAPI) => {
    const expenses = [];
    //we fetch values once. We use the await keyword to wait for the result
    //Really weird but doesn't work onValue
    await get(ref(db, 'expenses')).then((snapshot) => {
        snapshot.forEach((childSnap) => {
            expenses.push({
                id:childSnap.key, 
                ...childSnap.val()
            });
        });
    });
    return expenses;
});

const initialState = [];

//Redux toolkit syntax
//Name defines the name in the store, initial state initializes the value and reducers are the actions that can manipulate the value
//Actions are defined by types, using the name as the first thing then a / to define the action. ie. counter/increment
//Reducers are pure functions - output is only determined by the input
//They never change state or action

export const expenseSlice = createSlice({
    name: 'expenses',
    initialState,
    reducers: {
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
        }),
        builder.addCase(setExpenses.pending, (state, {payload}) => {
            console.log('Fetching Data...');
        }),
        builder.addCase(setExpenses.fulfilled, (state, {payload}) => {
            console.log('Done...');
            return payload;
        }),
        builder.addCase(setExpenses.rejected, (state, { payload }) => {
            console.log('Fetching Failed...');
            return initialState;
        }),
        builder.addCase(removeExpense.fulfilled, (state, { payload }) => {
            console.log("Removed");
        }),
        builder.addCase(removeExpense.rejected, (state, { payload }) => {
            console.log("Failed to Remove");
        })
    }
});

export const { editExpense } = expenseSlice.actions;

export default expenseSlice.reducer;