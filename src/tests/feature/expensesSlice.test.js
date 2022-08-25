import expensesReducer, { addExpense, editExpense, removeExpense } from "../../feature/expenseSlice";
import {expenses} from '../fixtures/expenses';
import appStore from '../../store/appStore';


test("Should test action type to remove an expense", () => {
    const result = removeExpense("idnumber!");
    expect(result).toEqual({
        type: 'expenses/removeExpense',
        payload: "idnumber!"
    });
});

test("Should test editExpense action type", () => {
    const payload = {
        id: "1234",
        note: "New note content!"
    };
    const result = editExpense(payload);
    expect(result).toEqual({
        type: "expenses/editExpense",
        payload: {
            id: "1234",
            note: "New note content!"
        }
    });
});

/*
test('Should test addExpense action type with values', () => {
    const data = {
        description: 'Rent',
        amount: 1000,
        createdAt: Date.now(),
        note: 'Test note!'
    };
    const result = addExpense(data);
    expect(result).toEqual({
        type: 'expenses/addExpense',
        payload: {
            id: expect.any(String), //We only check the type of the data
            ...data
        }
    });
});
*/

test('Should set default state', () => {
    const state = expensesReducer(undefined, {type: '@@INIT'});
    expect(state).toEqual([]);
});

test('Should remove expense', () => {
    //define the store to test reducers
    const store = appStore();
    store.dispatch(addExpense(expenses[0]));
    store.dispatch(removeExpense('1234'));
    expect(store.getState().expenses).toEqual([ ]);
});

test('Should not remove expense', () => {
    //define the store to test reducers
    const store = appStore();
    store.dispatch(addExpense(expenses[0]));
    const action = 
    {
        type: 'expenses/removeExpense',
        payload: '4'
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([ ...expenses ]);

});

test('Should add expense', () => {
    const store = appStore();
    const payload = {
        description: 'laptop',
        note: '',
        createdAt: Date.now(),
        amount: 99999
    };
    store.dispatch(addExpense(payload));
    expect(store.getState().expenses).toContain(payload);
});

test('Should edit expense', () => {
    const store = appStore();
    const expense = {
        description: 'laptop',
        note: '',
        createdAt: Date.now(),
        amount: 99999
    };
    store.dispatch(addExpense(expense));
    const payload = {
        id: '1234',
        updates: {
            description: 'LAPTOP'
        }
    };
    store.dispatch(editExpense(payload));
    expect(store.getState().expenses[0].description).toBe(payload.updates.description);
});

test('Should not edit expense', () => {
    const store = appStore();
    const expense = {
        description: 'LAPTOP',
        note: '',
        createdAt: Date.now(),
        amount: 99999
    };
    store.dispatch(addExpense(expense));
    const payload = {
        id: '7',
        updates: {
            description: 'POI'
        }
    };
    store.dispatch(editExpense(payload));
    expect(store.getState().expenses[0].description).toBe('LAPTOP');
});

//tests broken when ported to async calls