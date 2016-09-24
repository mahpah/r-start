export const createStore = (reducer) => {
  let state;
  let listeners = [];

  const getState = () => state;

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  };

  const subscribe = listener => {
    listeners.push(listener);

    return () => {
      listeners = listeners.filter(it => it !== listener);
    };
  };

  dispatch({});

  return {
    getState,
    dispatch,
    subscribe,
  };
};

/**
 *
 */
export const combineReducers = (reducers) =>
  (state = {}, action) => Object.keys(reducers).reduce(
    (memo, key) => ({
      ...memo,
      [key]: reducers[key](state[key], action),
    }),
    {}
  );
