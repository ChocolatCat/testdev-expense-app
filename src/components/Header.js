import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout } from '../feature/userSlice';

//React Router v6 -> activeClassName changes to that if statement

//<NavLink to="/help" className={({isActive}) => (isActive ? 'is-active' : 'inactive')}>I need help!</NavLink>
const Header = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.isLogged);
    return (
        <header>
            <h1>Expense App!</h1>
            {user ?
            <div>
                <NavLink to="/dashboard" className={({isActive}) => (isActive ? 'is-active' : 'inactive')}>Home</NavLink>
                <NavLink to="/create" className={({isActive}) => (isActive ? 'is-active' : 'inactive')}>Create expense</NavLink>
                <button onClick={()=>{
                    dispatch(logout());
                }}>Logout</button>
            </div>
            : <p></p>}
        </header>
    );
};

export default Header;