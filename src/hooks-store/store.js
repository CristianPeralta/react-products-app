import { useState, useEffect } from 'react';

let globalState = {};
let actions = [];
let listeners = [];

const useStore = () => {
    const setState = useState(globalState)[1];

    useEffect(() => {
        listeners.push(useState);
    }, [setState]);
};
