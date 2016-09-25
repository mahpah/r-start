export const createIdList = filter =>
  (state = [], action) => {
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

export const getIdList = state => state;
