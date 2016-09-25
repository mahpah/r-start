import React from 'react';
const { PropTypes } = React;
import { connect } from 'react-redux';
import { toggleTodo, deleteTodo } from '../actions';

const Todo = ({
  onClick,
  completed,
  text,
  onClickDelete,
}) => (
  <li
    className="todo-item"
    onClick={onClick}
    style={{
      textDecoration: completed ? 'line-through' : 'initial',
      color: completed ? '#999' : '#333',
    }}
  >
    {text}
    <button
      className="todo-delete"
      onClick={e => {
        e.stopPropagation();
        onClickDelete();
      }}
    >x</button>
  </li>
);

Todo.propTypes = {
  onClick: PropTypes.func,
  completed: PropTypes.bool,
  text: PropTypes.string,
  onClickDelete: PropTypes.func,
};

export const TodoList = ({
  todos,
  onTodoClick,
  onTodoDelete,
}) => (
  <ul className="todo-list">
    {todos.map(todo =>
      <Todo
        key={todo.id} {...todo}
        onClick={() => onTodoClick(todo.id)}
        onClickDelete={() => onTodoDelete(todo.id)}
      />
    )}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object),
  onTodoClick: PropTypes.func,
  onTodoDelete: PropTypes.func,
};

const getVisibleTodos = (todos, filter) => {
  if (filter === 'completed') {
    return todos.filter(t => t.completed);
  }

  if (filter === 'pending') {
    return todos.filter(t => !t.completed);
  }

  return todos;
};

const mapStateToProps = (state, ownProps) => ({
  todos: getVisibleTodos(
    state.todos,
    ownProps.filter
  ),
});

const mapDispatchToProps = (dispatch) => ({
  onTodoClick(id) {
    dispatch(toggleTodo(id));
  },

  onTodoDelete(id) {
    dispatch(deleteTodo(id));
  },
});

export const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);
