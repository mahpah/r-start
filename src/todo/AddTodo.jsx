import React from 'react';
const { PropTypes } = React;

export const AddTodo = (
  {},
  { store }
) => {
  let input;
  const onFormSubmit = (e) => {
    e.preventDefault();
    const text = input.value;
    store.dispatch({
      type: 'ADD',
      payload: { text },
    });
    input.value = '';
  };

  return (
    <form onSubmit={onFormSubmit}>
      <input
        type="text"
        ref={node => { input = node; }}
      />
      <button>Add</button>
    </form>
  );
};

AddTodo.contextTypes = {
  store: PropTypes.object,
};
