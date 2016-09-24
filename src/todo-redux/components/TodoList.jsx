import React from 'react';
const { PropTypes } = React;
import { connect } from 'react-redux';
import { toggleTodo } from '../actions';

const Todo = ({
  onClick,
  completed,
  text,
}) => (
  <li
    className="todo-item"
    onClick={onClick}
    style={{
      textDecoration: completed ? 'line-through' : 'initial',
      opacity: completed ? 0.4 : 1,
    }}
  >{text}</li>
);

Todo.propTypes = {
  onClick: PropTypes.func,
  completed: PropTypes.bool,
  text: PropTypes.string,
};

export const TodoList = ({
  todos,
  onTodoClick,
}) => (
  <ul className="todo-list">
    {todos.map(todo =>
      <Todo key={todo.id} {...todo} onClick={() => onTodoClick(todo.id)} />
    )}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object),
  onTodoClick: PropTypes.func,
};

const getVisibleTodos = (todos, filter) => {
  if (filter === 'SHOW_COMPLETED') {
    return todos.filter(t => t.completed);
  }

  if (filter === 'SHOW_PENDING') {
    return todos.filter(t => !t.completed);
  }

  return todos;
};

const mapStateToProps = (state) => ({
  todos: getVisibleTodos(state.todos, state.visibilityFilter),
});

const mapDispatchToProps = (dispatch) => ({
  onTodoClick: (id) => {
    dispatch(toggleTodo(id));
  },
});

export const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);
