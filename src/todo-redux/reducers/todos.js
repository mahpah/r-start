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
  const { type, payload } = action;

  if (type === 'ADD') {
    return [...state, todo(undefined, action)];
  }

  if (type === 'TOGGLE') {
    return state.map(t => todo(t, action));
  }

  if (type === 'DELETE') {
    return state.filter(t => t.id !== payload.id);
  }

  return state;
};

export const getVisibleTodos = (allTodos, filter) => {
  if (filter === 'completed') {
    return allTodos.filter(t => t.completed);
  }

  if (filter === 'pending') {
    return allTodos.filter(t => !t.completed);
  }

  return allTodos;
};