import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useParams, useNavigate} from 'react-router-dom';

import { selectExpenseById } from '../selectors/expenses';
import ExpenseForm from './ExpenseForm';
import {editExpense, removeExpense} from '../feature/expenseSlice'

//We use useParams to retrieve the parameters from the URL. We need a dynamic route using :param in the router.

const EditExpensePage = () => {
    const dispatch = useDispatch();
    const {id} = useParams();
    const navigate = useNavigate();
    const expense = useSelector(state => selectExpenseById(state.expenses.expenses, id));
    const uid = useSelector(state => state.user.uid);
    return (
        <div>
            <div className="page-header">
                <div className="content-container">
                <h1 className="page-header__title">Edit {expense.description}</h1>
                </div>
            </div>
            <div className='content-container'>
                <ExpenseForm 
                    mode="edit"
                    expense={expense}
                    onSubmit={(expense) => {
                        dispatch(editExpense({
                            id: id,
                            updates: expense,
                            uid: uid
                        }));
                        navigate('/dashboard');
                    }}
                />
                <button className="button--danger" onClick={()=>{
                    dispatch(removeExpense({id, uid}));
                    navigate('/dashboard');
                }}>Remove {expense.description}</button>
            </div>
        </div>
    );
};

export default EditExpensePage;