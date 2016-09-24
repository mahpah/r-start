import { expect, log } from '../lib/expect';
import { todos, todoApp } from './reducer';

const testAdd = () => {
  const before = [];
  const action = {
    type: 'ADD',
    payload: {
      id: 0,
      text: 'Learn Redux',
    },
  };

  const after = [
    {
      id: 0,
      text: 'Learn Redux',
      completed: false,
    },
  ];

  expect(
    todos(before, action)
  ).valueEqual(after);
};

const testToggle = () => {
  const before = [{
    id: 0,
    text: 'Learn Redux',
    completed: false,
  }];

  const action = {
    type: 'TOGGLE',
    payload: {
      id: 0,
    },
  };

  const after = [{
    id: 0,
    text: 'Learn Redux',
    completed: true,
  }];

  expect(
    todos(before, action)
  ).valueEqual(after);
};


const testFilter = () => {
  const before = {
    visibilityFilter: 'SHOW_ALL',
    todos: [],
  };

  const action = {
    type: 'SET_FILTER',
    payload: 'SHOW_PENDING',
  };

  const after = {
    visibilityFilter: 'SHOW_PENDING',
    todos: [],
  };

  expect(
    todoApp(before, action)
  ).valueEqual(after);
};

const test = () => {
  testAdd();
  testToggle();
  testFilter();
};

test();
log('au co');
