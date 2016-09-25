import { v4 as idv4 } from 'uuid';

export const addTodo = text => ({
  type: 'ADD',
  payload: {
    text,
    id: idv4(),
  },
});

export const toggleTodo = id => ({
  type: 'TOGGLE',
  payload: {
    id,
  },
});

export const setVisibilityFilter = (filter) => ({
  type: 'SET_FILTER',
  payload: filter,
});

export const deleteTodo = (id) => ({
  type: 'DELETE',
  payload: { id },
});
