//import {createSelector} from '@reduxjs/toolkit';
import {isAfter, isBefore, isSameDay} from 'date-fns';

const selectExpenses = (expenses, {text, sortBy, startDate, endDate}) => {
    return expenses.filter((expense) => {
        const createdAtMoment = expense.createdAt;
        const startDateMatch = startDate ?  isAfter(createdAtMoment, startDate) || isSameDay(startDate, createdAtMoment) : true;
        const endDateMatch = endDate ? isBefore(createdAtMoment, endDate) || isSameDay(endDate, createdAtMoment) : true;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase()) || expense.note.toLowerCase().includes(text.toLowerCase());
        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b) => {
        if(sortBy === 'date'){
            return a.createdAt > b.createdAt ? 1 : -1
        }
        if(sortBy === 'amount'){
            return a.amount > b.amount ? 1 : -1;
        }
    });  
};

const selectExpenseById = (expenses, id) => {
    return expenses.find( (expense) => {
        return expense.id === id;
    });
};

const selectExpensesTotal = (expenses) => {
    return expenses
        .map( (expense) => expense.amount )
        .reduce( (sum, value) => sum+value, 0);
}

export {selectExpenses, selectExpenseById, selectExpensesTotal};