import React from 'react';
import {useSelector} from 'react-redux';

import ExpenseListItem from './ExpenseListItem';
import {selectExpenses} from '../selectors/expenses'

const ExpenseList = () => {
    //We bypass connect. We use value because we would get an object otherwise
    const expenses = useSelector(state => selectExpenses(state.expenses, state.filters));
    return (
        <div>
            {expenses.length > 0 ? expenses.map((expense)=> {
                //We spread the entire props so we don't need to do expense.prop
                return <ExpenseListItem key={expense.id} {...expense} />
            }) : <p>No Expenses Added!</p>}
        </div>
    );
};

/*
Old Syntax

const ExpenseList = (props) => (
    <div>
        <h1>Expense List</h1>
        {props.expenses.length}
    </div>
); 

const mapStateToProps = (state) => {
    return {
        expenses: state.expenses,
        filters: state.filters
    };
};

export default connect(mapToStateProps)(ExpenseList);

*/


export default ExpenseList;