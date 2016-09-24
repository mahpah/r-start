import { todoApp } from './reducer';
import { createStore } from '../lib/redux';

export const store = createStore(todoApp);
