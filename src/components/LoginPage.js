import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { login } from '../feature/userSlice';
import LoadingStrip  from './LoadingStrip';

const LoginPage = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.uid);
    return (
        user ? <Navigate to="/dashboard" /> :
        <div className="box-layout">
            <div className="box-layout__box">
                <h1 className="box-layout__title">Track Expenses</h1>
                <p className="box-layout__subtitle">Get your expenses on line!</p>
                <button className="button" onClick={() => {
                    dispatch(login());
                }}>Login with Google!</button>
            </div>
        </div>
    );
};

export default LoginPage;