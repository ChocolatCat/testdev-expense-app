import React from 'react';
import { Link } from "react-router-dom";
import {format} from 'date-fns';
import numeral from 'numeral';

const ExpenseListItem = ({id, description, amount, createdAt, note}) => {
    return (
        <div>
            <Link to={`/edit/${id}`}><h3>{description}</h3></Link>
            <p>
            {numeral(amount).format('$0,0[.]00')}
            - 
            {format(new Date(createdAt), "MMMM do, yyyy")}</p>
            <small>{note}</small>
        </div>
    );
};

export default ExpenseListItem;