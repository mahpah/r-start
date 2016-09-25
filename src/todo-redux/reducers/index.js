import { combineReducers } from 'redux';
import { todos, getVisibleTodos as getTodos } from './todos';

const visibilityFilter = (state = 'SHOW_ALL', action) => {
  const { type, payload } = action;

  if (type === 'SET_FILTER') {
    return payload;
  }

  return state;
};

export const todoApp = combineReducers({
  todos,
  visibilityFilter,
});

export const getVisibleTodos = (state, filter) => getTodos(state.todos, filter);
