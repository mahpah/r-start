import { combineReducers } from 'redux';

const handleToggleFn = filter => (state, action) => {
  const { result: toggledId, entities } = action.payload.response;
  const { completed } = entities.todo[toggledId];

  const shouldRemove = completed && filter !== 'completed' ||
    !completed && filter === 'completed';

  return shouldRemove ?
    state.filter(id => id !== toggledId) :
    state;
};

export const createIdList = filter => {
  const list = (state = [], action) => {
    const { type, payload } = action;
    const handleToggle = handleToggleFn(filter);

    if (type === 'RECEIVE' && payload.filter === filter) {
      const { response } = payload;
      return response.result;
    }

    if (type === 'ADD_SUCCESS' && filter !== 'completed') {
      return [...state, payload.response.result];
    }

    if (type === 'DELETE') {
      return state.filter(it => it !== payload.id);
    }

    if (type === 'TOGGLE_SUCCESS') {
      return handleToggle(state, action);
    }

    return state;
  };

  const isFetching = (state = false, action) => {
    const { type, payload } = action;
    if (type === 'REQUEST' && filter === payload.filter) {
      return true;
    }

    if (type === 'RECEIVE') {
      return false;
    }

    return state;
  };

  return combineReducers({
    list,
    isFetching,
  });
};

export const getIdList = state => state.list;
export const getIsFetching = state => state.isFetching;
