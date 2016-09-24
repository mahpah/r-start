import React from 'react';
import { connect } from 'react-redux';
const { PropTypes } = React;
import { addTodo } from './reducer';

const AddTodoDumb = ({
  dispatch,
}) => {
  let input;
  const onFormSubmit = (e) => {
    e.preventDefault();
    const text = input.value;
    if (!text) {
      return;
    }
    dispatch(addTodo(text));
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

AddTodoDumb.propTypes = {
  dispatch: PropTypes.func,
};

export const AddTodo = connect()(AddTodoDumb);
