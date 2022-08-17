import React from 'react';
import { Link } from "react-router-dom";
import {format} from 'date-fns';

const ExpenseListItem = ({id, description, amount, createdAt, note}) => {
    return (
        <div>
            <Link to={`/edit/${id}`}><h3>{description}</h3></Link>
            <p>${amount} - {format(new Date(createdAt), "MMM dd, yyyy")}</p>
            <small>{note}</small>
        </div>
    );
};

export default ExpenseListItem;