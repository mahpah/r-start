/**
 * Todo map reducer
 * @param {object} state
 * @parm
 */
export const byId = (state = {}, action) => {
  const { type, payload } = action;

  if (type === 'RECEIVE') {
    const { response } = payload;

    return {
      ...state,
      ...response.entities.todo,
    };
  }

  if (type === 'ADD_SUCCESS' || type === 'TOGGLE_SUCCESS') {
    return {
      ...state,
      ...payload.response.entities.todo,
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
