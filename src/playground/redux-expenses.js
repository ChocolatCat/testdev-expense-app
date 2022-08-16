import {configureStore} from '@reduxjs/toolkit';
import expenseReducer, {addExpense, editExpense, removeExpense} from '../slice/expenseSlice';
import filtersReducer, {setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate} from '../slice/filtersSlice';

//Get expenses filtered

const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) => {
    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase()) || expense.note.toLowerCase().includes(text.toLowerCase());
        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b) => {
        if(sortBy === 'date'){
            return a.createdAt < b.createdAt ? 1 : -1
        }
        if(sortBy === 'amount'){
            return a.amount < b.amount ? 1 : -1;
        }
    });  
};

const store = configureStore({
    reducer:{
        expenses: expenseReducer,
        filters: filtersReducer
    }
});

store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses.value, state.filters.value);
    console.log(visibleExpenses);
});

const expenseOne = store.dispatch(addExpense({
    description: "Arriendo",
    amount: 400,
    createdAt: -21000
}));

const expenseTwo = store.dispatch(addExpense({
    description: "Coffee",
    amount: 500,
    createdAt: -1000
}));

//store.dispatch(setTextFilter('ffe'));
store.dispatch(sortByAmount());
/*
store.dispatch(removeExpense(expenseOne.payload.id));

store.dispatch(editExpense({
    id: expenseTwo.payload.id,
    updates: {
        amount: 500,
        description: "UN ASAITO"
    }
}));

store.dispatch(setTextFilter());

store.dispatch(sortByAmount());
store.dispatch(sortByDate());
store.dispatch(setStartDate(125));
store.dispatch(setStartDate());
store.dispatch(setEndDate(666));
store.dispatch(setEndDate());
*/