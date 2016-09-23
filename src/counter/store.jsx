import { createStore } from '../lib/redux';
import { counter } from './reducer';

export const store = createStore(counter);
