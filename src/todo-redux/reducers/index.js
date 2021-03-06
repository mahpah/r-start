import { combineReducers } from 'redux';
import { byId, getTodoById } from './byId';
import { createIdList, getIdList, getIsFetching as getIsListFetching } from './idList';

const filterList = combineReducers({
  all: createIdList('all'),
  pending: createIdList('pending'),
  completed: createIdList('completed'),
});

export const todos = combineReducers({
  byId,
  filterList,
});

export const getVisibleTodos = (state, filter = 'all') => {
  const idList = getIdList(state.filterList[filter]);
  return idList.map(id => getTodoById(state.byId, id));
};

export const getIsFetching = (state, filter = 'all') =>
  getIsListFetching(state.filterList[filter]);
