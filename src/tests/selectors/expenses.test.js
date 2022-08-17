import { selectExpenses, selectExpenseById, selectExpensesTotal } from "../../selectors/expenses";
import {subDays, addDays} from 'date-fns';
import {today, expenses} from '../fixtures/expenses';


test('should filter by text value', () => {
    const filters = {
        text: 'e',
        sortBy: 'date',
        startDate: undefined,
        endDate: undefined
    };
    const result = selectExpenses(expenses, filters);
    expect(result).toEqual([ expenses[1], expenses[2] ]);
});

test('should filter by startDate', () => {
    const filters = {
        text: '',
        sortBy: 'date',
        startDate: today,
        endDate: undefined
    };
    const result = selectExpenses(expenses, filters);
    expect(result).toEqual([ expenses[0], expenses[2] ]);
});

test('should filter by endDate', () => {
    const filters = {
        text: '',
        sortBy: 'date',
        startDate: undefined,
        endDate: today
    };
    const result = selectExpenses(expenses, filters);
    expect(result).toEqual([ expenses[1], expenses[0] ]);
});

test('should sort by date', () => {
    const filters = {
        text: '',
        sortBy: 'date',
        startDate: undefined,
        endDate: undefined
    };
    const result = selectExpenses(expenses, filters);
    expect(result).toEqual([ expenses[1], expenses[0], expenses[2] ]);
});

test('should sort by date', () => {
    const filters = {
        text: '',
        sortBy: 'amount',
        startDate: undefined,
        endDate: undefined
    };
    const result = selectExpenses(expenses, filters);
    expect(result).toEqual([ expenses[0], expenses[2], expenses[1] ]);
});

test('Should return 0 with an empty expense array', () => {
    const response = selectExpensesTotal([]);
    expect(response).toBe(0);
});

test('Should return result with only one element in array', () => {
    const response = selectExpensesTotal([expenses[0]]);
    expect(response).toBe(10);
});

test('Should return result with multiple elements in array', () => {
    const response = selectExpensesTotal(expenses);
    expect(response).toBe(50010);
});