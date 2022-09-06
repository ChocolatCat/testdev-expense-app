import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../feature/userSlice';
import LoadingStrip  from './LoadingStrip';

const LoginPage = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.uid);
    return (
        user ? <LoadingStrip /> :
        <div>
            <button onClick={() => {
                dispatch(login());
            }}>Login!</button>
        </div>
    );
};

export default LoginPage;