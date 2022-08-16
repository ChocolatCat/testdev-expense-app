import {configureStore} from '@reduxjs/toolkit';
import counterReducer, {increment, incrementByAmount, decrement, decrementByAmount, reset, setValue} from '../slice/counterSlice'

/* 
    Redux vanilla syntax
    const store = createStore((state = {count: 0}) => {
        return state;
    });
*/
//Redux toolkit syntax -> We need to import reducers from their own file

const store = configureStore({
    reducer: {
        counter: counterReducer
    }
});

//We use subscribe to check for changes. It executes any time the state changes
store.subscribe(()=> {
    console.log(store.getState());
});

// Redux Toolkit: We dispatch changes using dispatch(functionToUse()). Functions to use are defined in our reducer
store.dispatch(increment());
//We pass the argument to add it
store.dispatch(incrementByAmount(10));
store.dispatch(decrement());
store.dispatch(decrementByAmount(5));
store.dispatch(reset());
store.dispatch(setValue(666));