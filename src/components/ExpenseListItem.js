import React from 'react';
import { Link } from "react-router-dom";
import {format} from 'date-fns';
import numeral from 'numeral';

const ExpenseListItem = ({id, description, amount, createdAt, note}) => {
    return (
        <Link className='list-item' to={`/edit/${id}`}>
            <div>
                <h3 className='list-item__title'>{description}</h3>
                <span className='list-item__subtitle'>{format(new Date(createdAt), "MMMM do, yyyy")}</span><br />
                <small>{note}</small>
            </div>
            <h3 className='list-item__data'>
                {numeral(amount).format('$0,0[.]00')}
            </h3>
        </Link>
    );
};

export default ExpenseListItem;