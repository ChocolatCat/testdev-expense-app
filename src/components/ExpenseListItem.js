import React from 'react';
import { Link } from "react-router-dom";

const ExpenseListItem = ({id, description, amount, createdAt, note}) => {
    return (
        <div>
            <Link to={`/edit/${id}`}><h3>{description}</h3></Link>
            <p>{amount} - {createdAt}</p>
            <small>{note}</small>
        </div>
    );
};

export default ExpenseListItem;