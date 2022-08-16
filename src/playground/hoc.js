import React from 'react';
import ReactDOM from 'react-dom/client';

const Info = (props) => (
    <div>
        <h1>Info</h1>
        <p>The info is: {props.info}</p>
    </div>
);

const withAdminWarning = (WrappedComponent) => {
    //We pass the spreaded props to the wrapped component
    return (props) => (
        <div>
            {props.isAdmin && <p>This is private info!!!!</p>}
            <WrappedComponent {...props}/>
        </div>
    );
};

const requireAuthentication = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAuthenticated ? <WrappedComponent {...props}/> : <h1>This is private info! Log in first!</h1>}
        </div>
    );
}

const AuthInfo = requireAuthentication(Info);

const AdminInfo = withAdminWarning(Info);

//React 18
const container = document.getElementById("app");
const root = ReactDOM.createRoot(container);

root.render(<AuthInfo isAuthenticated={false} info="Here are the details" />);