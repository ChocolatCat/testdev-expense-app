import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import DatePicker from 'react-datepicker'

import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate } from '../feature/filtersSlice';

const ExpenseListFilters = () => {
    const dispatch = useDispatch();
    const {filters} = useSelector(state=>state);
    return (
        <div>
            <input type="text" placeholder="Filter by Text" value={filters.text} onChange={(e) => {
                //We useDispatch with Redux Toolkit using React hooks
                dispatch(setTextFilter(e.target.value));
            }}></input>
            <select value={filters.sortBy} name="Sort By" onChange={(e) => {
                if(e.target.value === "date"){
                    dispatch(sortByDate());
                }
                if(e.target.value === "amount"){
                    dispatch(sortByAmount());
                }
            }}>
                <option value="date">Date</option>
                <option value="amount">Amount</option>
            </select>
            <DatePicker 
                selected={filters.startDate}
                onChange={(date) => dispatch(setStartDate(Date.parse(date)))}
                selectsStart
                startDate={filters.startDate}
                endDate={filters.endDate}
                dateFormat="dd/MM/yyyy"
            />
            <DatePicker 
                selected={filters.endDate}
                onChange={(date) => dispatch(setEndDate(Date.parse(date)))}
                selectsEnd
                startDate={filters.startDate}
                endDate={filters.endDate}
                minDate={filters.startDate}
                dateFormat="dd/MM/yyyy"
            />
        </div>
    );
};

export default ExpenseListFilters;