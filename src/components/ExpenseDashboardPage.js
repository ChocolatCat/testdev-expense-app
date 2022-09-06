import React, {useEffect} from 'react';
import ExpenseList from './ExpenseList';
import { useSelector, useDispatch } from 'react-redux';
import { setExpenses } from '../feature/expenseSlice';
import ExpenseListFilters from './ExpenseListFilters';
import ExpensesSummary from './ExpensesSummary';
import { selectExpenses, selectExpensesTotal } from '../selectors/expenses';

const ExpenseDashboardPage = () => {
    const dispatch = useDispatch();
    //We make sure the read is only made once
    const visibleExpenses = useSelector(state => selectExpenses(state.expenses, state.filters));
    const user = useSelector(state => state.user.uid);
    useEffect(() => {
        dispatch(setExpenses(user));
    }, [dispatch]);
    //We get the rendered expenses
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