import React from 'react';
import ReactDOM from 'react-dom';
const host = document.getElementById('app-host');
import { store } from './store';
import { Counter } from './Counter';

if (!host) {
  throw new Error('Cannot attach app to DOM');
}

const render = () => ReactDOM.render(
  <Counter
    value={store.getState()}
    onIncrease={() => store.dispatch({ type: 'INCREMENT' })}
    onDecrease={() => store.dispatch({ type: 'DECREMENT' })}
  />,
  host
);

store.subscribe(render);
render();
