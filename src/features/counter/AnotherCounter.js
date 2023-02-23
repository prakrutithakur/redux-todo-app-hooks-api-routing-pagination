import { useReducer } from "react";

const initialState = { count: 0 };

function reducer(state, action) {
    switch (action.type) {
        case 'increment':
            return { count: state.count + 1 };
        case 'decrement':
            return { count: state.count - 1 };
        case 'reset':
            return { count: 0 }
        default:
            throw new Error();
    }
}
const logger = store => next => action => {
    console.group(action.type)
    console.info('dispatching', action)
    let result = next(action)
    console.log('next state', store.getState())
    console.groupEnd()
    return result
}
console.log("logger info is" + logger)

function AnotherCounter() {
    const [state, dispatch] = useReducer(reducer, initialState);
    console.log("function AnotherCounter has been activated");
    console.log("dispatch:" + dispatch);
    console.log(state);

    return (
        <>
            <div style={{ marginTop: "10px" }}>
                Count: {state.count}
            </div>
            <div style={{ marginTop: "5px" }}>
                <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
                <button onClick={() => dispatch({ type: 'increment' })}>+</button>
                <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
            </div>
        </>
    );
}

export default AnotherCounter;