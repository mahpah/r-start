import api from '../../lib/fakeTodoApi';
import { getIsFetching } from '../reducers';
import { normalize } from 'normalizr';
import { arrayOfTodo, todo } from './schema';

export const addTodo = text => (dispatch) =>
  api.create(text)
    .then(response =>
      dispatch({
        type: 'ADD_SUCCESS',
        payload: {
          response: normalize(response, todo),
        },
      })
    );

export const toggleTodo = id => (dispatch) =>
  api.toggle(id)
    .then(response => {
      dispatch({
        type: 'TOGGLE_SUCCESS',
        payload: { response: normalize(response, todo) },
      });
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

const requestTodos = filter => ({
  type: 'REQUEST',
  payload: { filter },
});

export const fetchTodos = (filter) => (dispatch, getState) => {
  if (getIsFetching(getState(), filter)) {
    return Promise.resolve(); // consitent return value
  }

  dispatch(requestTodos(filter));
  return api.get(filter).then(response =>
    dispatch(receiveTodos(
      filter,
      normalize(response, arrayOfTodo)
    ))
  );
};

