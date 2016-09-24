import { combineReducers } from 'redux';
let counter = 0;

/**
 * single todo reducer
 * @param {object} state single todo
 */
const todo = (state, action) => {
  const { type, payload } = action;

  if (type === 'ADD') {
    return {
      ...payload,
      completed: false,
    };
  }

  if (type === 'TOGGLE') {
    if (state.id !== payload.id) {
      return state;
    }

    return {
      ...state,
      completed: !state.completed,
    };
  }

  return state;
};

/**
 * Todo list reducer
 * @param {array} state
 * @parm
 */
export const todos = (state = [], action) => {
  const { type } = action;

  /* supper ugly code
  const identity = a => a;
  return ({
    ADD: () => [...state, todo(undefined, action)],
    TOGGLE: () => state.map(t => todo(t, action)),
  }[type] || identity)();
  */

  if (type === 'ADD') {
    return [...state, todo(undefined, action)];
  }

  if (type === 'TOGGLE') {
    return state.map(t => todo(t, action));
  }

  return state;
};

const filter = (state = 'SHOW_ALL', action) => {
  const { type, payload } = action;

  if (type === 'SET_FILTER') {
    return payload;
  }

  return state;
};

export const todoApp = combineReducers({
  todos,
  visibilityFilter: filter,
});

export const addTodo = text => ({
  type: 'ADD',
  payload: {
    text,
    id: counter++,
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
