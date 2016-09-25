import { v4 as idv4 } from 'uuid';
import api from '../../lib/fakeTodoApi';

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

export const deleteTodo = (id) => ({
  type: 'DELETE',
  payload: { id },
});

const receiveTodos = (filter, response) => ({
  type: 'RECEIVE',
  payload: {
    filter,
    response,
  },
});

export const fetchTodos = (filter) =>
  api.get(filter).then(response =>
    receiveTodos(filter, response)
  );

export const requestTodos = filter => ({
  type: 'REQUEST',
  payload: { filter },
});
