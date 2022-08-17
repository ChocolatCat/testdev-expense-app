import React from 'react';
import numeral from 'numeral';

const ExpensesSummary = ({ expensesCount = 0, expensesTotal =0 }) => {
    const expenseWord = expensesCount === 1 ? 'expense' : 'expenses';
    const formattedExpenses = numeral(expensesTotal).format('$0,0[.]00');
    return (
        <div>
            <h1>Viewing {expensesCount} {expenseWord} totalling {formattedExpenses}.</h1>
        </div>
    );
};

export default ExpensesSummary;