/**
 * single todo reducer
 * @param {object} state single todo
 */
export const todo = (state, action) => {
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
