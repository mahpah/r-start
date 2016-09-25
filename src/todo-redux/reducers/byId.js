/**
 * Todo map reducer
 * @param {object} state
 * @parm
 */
export const byId = (state = {}, action) => {
  const { type, payload } = action;

  if (type === 'RECEIVE') {
    const { response: todos } = payload;
    const newTodos = todos.reduce((memo, item) => ({
      ...memo,
      [item.id]: item,
    }), {});

    return {
      ...state,
      ...newTodos,
    };
  }

  if (type === 'DELETE') {
    // eslint-disable-next-line
    state[payload.id] = undefined;
    return state;
  }

  return state;
};

export const getTodoById = (state, id) => state[id];
