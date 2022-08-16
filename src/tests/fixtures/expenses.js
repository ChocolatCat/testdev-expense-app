import {subDays, addDays} from 'date-fns';

const today = new Date(2022, 7, 10, 8).getTime(); //today at this time with timestamp
//test data
const expenses = [
    {
        id: '1',
        description: 'Gum',
        note: '',
        amount: 10,
        createdAt: today
    },
    {
        id: '2',
        description: 'Rent',
        note: 'For august',
        amount: 40000,
        createdAt: subDays(today, 4).getTime()
    },
    {
        id: '3',
        description: 'Credit Card',
        note: '',
        amount: 10000,
        createdAt: addDays(today, 4).getTime()
    },
];

export {today, expenses};