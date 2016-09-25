import { todo } from './todo';
import { combineReducers } from 'redux';

/**
 * Todo map reducer
 * @param {object} state
 * @parm
 */
const byId = (state = {}, action) => {
  const { type, payload } = action;

  if (type === 'ADD' || type === 'TOGGLE') {
    return {
      ...state,
      [payload.id]: todo(state[payload.id], action),
    };
  }

  if (type === 'DELETE') {
    // eslint-disable-next-line
    state[payload.id] = undefined;
    return state;
  }

  if (type === 'RECEIVE') {
    const { response: todos } = payload;
    return todos.reduce((memo, item) => ({
      ...memo,
      [item.id]: item,
    }), {});
  }

  return state;
};

const allIds = (state = [], action) => {
  const { type, payload } = action;
  if (type === 'ADD') {
    return [...state, payload.id];
  }

  if (type === 'DELETE') {
    return state.filter(it => it !== payload.id);
  }

  if (type === 'RECEIVE') {
    const { response: todos } = payload;
    return todos.map(t => t.id);
  }

  return state;
};

export const todos = combineReducers({
  byId,
  allIds,
});

export const getVisibleTodos = (state, filter) => {
  const allTodos = state.allIds.map(id => state.byId[id]);

  if (filter === 'completed') {
    return allTodos.filter(t => t.completed);
  }

  if (filter === 'pending') {
    return allTodos.filter(t => !t.completed);
  }

  return allTodos;
};
