import { todos, getVisibleTodos as getTodos } from './todos';

export const todoApp = todos;
export const getVisibleTodos = (state, filter) => getTodos(state, filter);
