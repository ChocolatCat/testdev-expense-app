import React from 'react';
import { Routes, Route, unstable_HistoryRouter as HistoryRouter} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import {createBrowserHistory} from 'history';

import AddExpensePage from '../components/AddExpensePage';
import EditExpensePage from '../components/EditExpensePage';
import ExpenseDashboardPage from '../components/ExpenseDashboardPage';
import Header from '../components/Header';
import HelpPage from '../components/HelpPage';
import NotFoundPage from '../components/NotFoundPage'
import LoginPage from '../components/LoginPage';
import {auth} from '../firebase/firebase';
import { setLogStatus, setUid } from '../feature/userSlice';

let history = createBrowserHistory();

//React Router
//V6 onwards component -> element - Route must be nested on a routes element. Elements need to be called as JSX elements instead
//The * selector helps us use any route not defined
//:id give us dynamic value to the url
const AppRouter = () => {
    const dispatch = useDispatch();
    auth.onAuthStateChanged((user) => {
        if(user){
            dispatch(setLogStatus(true));
            dispatch(setUid(user.uid));
            history.replace('/dashboard');
        }
        else{
            dispatch(setLogStatus(false));
            dispatch(setUid(undefined));
            history.replace('/');
        }
    });
    const isLogged = useSelector(state => state.user.uid);
    return (
        <HistoryRouter history={history}>
            <div>
                <Header />
                <Routes>
                    {!isLogged && <Route path="/" element={<LoginPage />} />}
                    {isLogged && <Route path="/dashboard" element={<ExpenseDashboardPage />} />}
                    {isLogged && <Route path="/create" element={<AddExpensePage />} />}
                    {isLogged && <Route path="/edit/:id" element={<EditExpensePage/>} />}
                    <Route path="/help" element={<HelpPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </div>
        </HistoryRouter>
    );
};

export default AppRouter;