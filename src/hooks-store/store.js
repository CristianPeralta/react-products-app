import { useState, useEffect } from 'react';

let globalState = {};
let actions = {};
let listeners = [];

export const useStore = () => {
    const setState = useState(globalState)[1];

    const dispatch = actionIdentifier => {
        const newState = actions[actionIdentifier](globalState);
        globalState = { ...globalState, ...newState };

        for (const listener of listeners) {
            listener(globalState);
        }
    }

    useEffect(() => {
        listeners.push(useState);
        return () => {
            listeners = listeners.filter(li => li !== setState);
        }
    }, [setState]);

    return [globalState, dispatch];
};

export const initState = (userActions, initialState) => {
    if (initState) {
        globalState = { ...globalState, ...initialState };

        actions = { ...actions, ...userActions };
    }
}