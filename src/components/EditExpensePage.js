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
    const expense = useSelector(state => selectExpenseById(state.expenses, id));
    return (
        <div>
            <ExpenseForm 
                expense={expense}
                onSubmit={(expense) => {
                    dispatch(editExpense({
                        id: id,
                        updates: expense
                    }));
                    navigate('/');
                }}
            />
            <button onClick={()=>{
                dispatch(removeExpense(id));
                navigate('/');
            }}>Remove</button>
        </div>
    );
};

export default EditExpensePage;