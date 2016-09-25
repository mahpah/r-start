import { combineReducers } from 'redux';

export const createIdList = filter => {
  const list = (state = [], action) => {
    const { type, payload } = action;

    if (type === 'RECEIVE' && payload.filter === filter) {
      const { response: todos } = payload;
      return todos.map(t => t.id);
    }

    if (type === 'DELETE') {
      return state.filter(it => it !== payload.id);
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
