import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../feature/userSlice';

//React Router v6 -> activeClassName changes to that if statement

//<NavLink to="/help" className={({isActive}) => (isActive ? 'is-active' : 'inactive')}>I need help!</NavLink>
const Header = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.isLogged);
    return (
        user ?
        <header className="header">
            <div className="content-container">
                <div className="header__content">
                    <Link className="header__title" to="/dashboard"><h1>Track Expenses</h1></Link>
                    <button className="button button--link" onClick={()=>{
                        dispatch(logout());
                    }}>Logout</button>
                </div>
            </div>
        </header>
        : <p></p>
    );
};

export default Header;