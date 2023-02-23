import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './todo/todoSlice';
import counterReducer from './features/counter/counterSlice';

export default configureStore({
    reducer: {
        counter: counterReducer,
        todos: todosReducer
    },
});