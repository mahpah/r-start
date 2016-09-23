import { expect, log } from '../lib/expect';

const todos = (state = [], action) => {
  const { type, payload } = action;

  if (type === 'ADD') {
    return [...state, {
      ...payload,
      completed: false,
    }];
  }

  return state;
};

const test = () => {
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

test();
log('au co');
