import React from 'react';
import ExpenseList from './ExpenseList';
import { useSelector } from 'react-redux';
import ExpenseListFilters from './ExpenseListFilters';
import ExpensesSummary from './ExpensesSummary';
import { selectExpenses, selectExpensesTotal } from '../selectors/expenses';

const ExpenseDashboardPage = () => {
    //We get the rendered expenses
    const visibleExpenses = useSelector(state => selectExpenses(state.expenses, state.filters));
    //We get them to sum them up
    const expensesCount = visibleExpenses.length;
    const expensesTotal = selectExpensesTotal(visibleExpenses);
    return(
        <div>
            <ExpenseListFilters />
            <ExpensesSummary expensesCount={expensesCount} expensesTotal={expensesTotal}/>
            <ExpenseList />
        </div>
    );
};

export default ExpenseDashboardPage;