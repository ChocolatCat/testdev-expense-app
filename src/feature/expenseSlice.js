import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import db, {app} from '../firebase/firebase';
import { ref, push, get, remove, update } from 'firebase/database';

//Thunk syntax for async functions
export const addExpense = createAsyncThunk('expenses/addExpense', 
async ({expense, uid}, thunkAPI) => {
    const {description = "No description", note = "No note", amount = 0, createdAt = 0} = expense;
    const expenseData = {description, note, amount, createdAt};
    const newExpense = push(ref(db, `users/${uid}/expenses/`), expenseData);
    return {id: newExpense.key, ...expenseData};
});

export const removeExpense = createAsyncThunk('expenses/removeExpense', 
async ({id, uid}, thunkAPI) => {
    await remove(ref(db, `users/${uid}/expenses/${id}`));
});

export const editExpense = createAsyncThunk('expenses/editExpense', 
async (expense, thunkAPI) => {
    await update(ref(db, `users/${expense.uid}/expenses/${expense.id}`), {
        ...expense.updates
    });
});

export const setExpenses = createAsyncThunk('expenses/setExpenses', 
async (uid, thunkAPI) => {
    const expenses = [];
    //we fetch values once. We use the await keyword to wait for the result
    //Really weird but doesn't work onValue
    await get(ref(db, `users/${uid}/expenses`)).then((snapshot) => {
        snapshot.forEach((childSnap) => {
            expenses.push({
                id:childSnap.key, 
                ...childSnap.val()
            });
        });
    });
    return expenses;
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
            return [];
        }),
        builder.addCase(removeExpense.fulfilled, (state, { payload }) => {
            console.log("Removed");
        }),
        builder.addCase(removeExpense.rejected, (state, { payload }) => {
            console.log("Failed to Remove");
        }),
        builder.addCase(editExpense.fulfilled, (state, { payload }) => {
            console.log("Edited");
        }),
        builder.addCase(editExpense.rejected, (state, { payload }) => {
            console.log("Failed to Edit");
        })
    }
});

//export const { editExpense } = expenseSlice.actions;

export default expenseSlice.reducer;