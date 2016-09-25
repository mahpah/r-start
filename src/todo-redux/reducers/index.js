import { combineReducers } from 'redux';
import { todos, getVisibleTodos as getTodos } from './todos';

export const todoApp = combineReducers({
  todos,
});

export const getVisibleTodos = (state, filter) => getTodos(state.todos, filter);
