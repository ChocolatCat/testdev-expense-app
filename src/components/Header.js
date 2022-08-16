import React from 'react';
import {NavLink} from 'react-router-dom';

//React Router v6 -> activeClassName changes to that if statement

//<NavLink to="/help" className={({isActive}) => (isActive ? 'is-active' : 'inactive')}>I need help!</NavLink>
const Header = () => (
    <header>
        <h1>Expense App!</h1>
        <NavLink to="/" className={({isActive}) => (isActive ? 'is-active' : 'inactive')}>Home</NavLink>
        <NavLink to="/create" className={({isActive}) => (isActive ? 'is-active' : 'inactive')}>Create expense</NavLink>
    </header>
);

export default Header;