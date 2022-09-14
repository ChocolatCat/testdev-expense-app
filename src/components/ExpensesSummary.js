import React from 'react';
import numeral from 'numeral';
import { Link } from 'react-router-dom';

const ExpensesSummary = ({ expensesCount = 0, expensesTotal =0, userTotal = 0}) => {
    const expenseWord = expensesCount === 1 ? 'expense' : 'expenses';
    const totalWord = userTotal === 1 ? 'expense' : 'expenses';
    const formattedExpenses = numeral(expensesTotal).format('$0,0[.]00');
    return (
        <div className="page-header">
            <div className="content-container">
                <h1 className="page-header__title">Viewing <span>{expensesCount}</span> {expenseWord} totalling <span>{formattedExpenses}</span>.</h1>
                <h3>You have a total of {userTotal} {totalWord}</h3>
                <div className="page-header__actions">
                    <Link to="/create" className="button">Add Expense</Link>
                </div>
            </div>
        </div>
    );
};

export default ExpensesSummary;