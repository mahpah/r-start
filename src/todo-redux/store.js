import { todoApp } from './reducer';
import { createStore } from 'redux';

export const store = createStore(todoApp);
