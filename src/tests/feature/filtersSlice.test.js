import filtersReducer, {setStartDate, setEndDate, setTextFilter, sortByAmount, sortByDate} from '../../feature/filtersSlice';
import {format, lastDayOfMonth} from 'date-fns';
import {today, expenses} from '../fixtures/expenses';

test("Should set start date action", () => {
    const dateNow = Date.now();
    const action = setStartDate(dateNow);
    expect(action).toEqual({
        type: 'filters/setStartDate',
        payload: dateNow
    });
});

test("Should set end date action", () => {
    const dateNow = Date.now();
    const action = setEndDate(dateNow);
    expect(action).toEqual({
        type: 'filters/setEndDate',
        payload: dateNow
    });
});

test("Should set text filter", () => {
    const action = setTextFilter("Poi");
    expect(action).toEqual({
        type: 'filters/setTextFilter',
        payload: "Poi"
    });
});

test("Should set sort by amount filter", () => {
    const action = sortByAmount();
    expect(action).toEqual({
        type: 'filters/sortByAmount'
    });
});

test("Should set sort by date filter", () => {
    const action = sortByDate();
    expect(action).toEqual({
        type: 'filters/sortByDate'
    });
});

test("Should set text filter with no text", () => {
    const action = setTextFilter();
    expect(action).toEqual({
        type: 'filters/setTextFilter'
    });
});

test('Should setup default filters', () => {
    const state = filtersReducer(undefined, {type: '@@INIT'});
    expect(state).toEqual({
        text: '',
        sortBy: 'date',
        startDate: 1659326400000,
        endDate: 1662004799000
    });
});

test('Should set sort by to amount', () => {
    const state = filtersReducer(undefined, {
        type: 'filters/sortByAmount'
    });
    expect(state.sortBy).toBe('amount');
});

test('Should set sort by to date', () => {
    const currentState = {
        text: '',
        startDate: undefined,
        endDate: undefined,
        sortBy: 'amount'
    };
    const action = {
        type: 'filters/sortByDate'
    };
    const state = filtersReducer(currentState, action);
    expect(state.sortBy).toBe('date');
});

test('Should set text filter', () => {
    const currentState = {
        text: '',
        startDate: undefined,
        endDate: undefined,
        sortBy: 'date'
    };
    const action = {
        payload: 'desu',
        type: 'filters/setTextFilter'
    };
    const state = filtersReducer(currentState, action);
    expect(state.text).toBe('desu');
});

test('Should set start date', () => {
    const currentState = {
        text: '',
        startDate: undefined,
        endDate: undefined,
        sortBy: 'amount'
    };
    const action = {
        payload: today,
        type: 'filters/setStartDate'
    };
    const state = filtersReducer(currentState, action);
    expect(state.startDate).toBe(today);
});

test('Should set sort by to date', () => {
    const currentState = {
        text: '',
        startDate: undefined,
        endDate: today,
        sortBy: 'amount'
    };
    const action = {
        payload: today,
        type: 'filters/setEndDate'
    };
    const state = filtersReducer(currentState, action);
    expect(state.endDate).toBe(today);
});