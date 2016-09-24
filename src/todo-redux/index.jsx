import React from 'react';
import ReactDOM from 'react-dom';
import { store } from './store';
import { AppRoot } from './components/AppRoot';

const host = document.getElementById('app-host');
if (!host) {
  throw new Error('Cannot attach app to DOM');
}

const render = () => ReactDOM.render(
  <AppRoot store={store} />,
  host
);

render();
