import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import ExpenseForm from './ExpenseForm';
import { addExpense } from '../feature/expenseSlice';

const AddExpensePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const uid = useSelector(state => state.user.uid);
    return (
        <div>
            <div className="page-header">
                <div className="content-container">
                <h1 className="page-header__title">Add New Expense</h1>
                </div>
            </div>
            <div className='content-container'>
                <ExpenseForm 
                    mode="add"
                    onSubmit={ (expense) => {
                        dispatch(addExpense({expense, uid}));
                        navigate('/dashboard');
                    }}
                />
            </div>
        </div>
    );
}
export default AddExpensePage;