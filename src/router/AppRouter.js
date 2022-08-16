import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import AddExpensePage from '../components/AddExpensePage';
import EditExpensePage from '../components/EditExpensePage';
import ExpenseDashboardPage from '../components/ExpenseDashboardPage';
import Header from '../components/Header';
import HelpPage from '../components/HelpPage';
import NotFoundPage from '../components/NotFoundPage'

//React Router
//V6 onwards component -> element - Route must be nested on a routes element. Elements need to be called as JSX elements instead
//The * selector helps us use any route not defined
//:id give us dynamic value to the url
const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Header />
            <Routes>
                <Route path="/" element={<ExpenseDashboardPage />} />
                <Route path="/create" element={<AddExpensePage />} />
                <Route path="/edit/:id" element={<EditExpensePage/>} />
                <Route path="/help" element={<HelpPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </div>
    </BrowserRouter>
);

export default AppRouter;