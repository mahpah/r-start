import { arrayOf, Schema } from 'normalizr';

export const todo = new Schema('todo');
export const arrayOfTodo = arrayOf(todo);
