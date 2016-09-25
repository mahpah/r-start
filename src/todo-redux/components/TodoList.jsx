import React from 'react';
const { PropTypes, Component } = React;
import { connect } from 'react-redux';
import { toggleTodo, deleteTodo, fetchTodos, requestTodos } from '../actions';
import { withRouter } from 'react-router';
import { getVisibleTodos, getIsFetching } from '../reducers';

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

class VisibleTodoListRaw extends Component {

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.filter !== prevProps.filter) {
      this.fetchData();
    }
  }

  fetchData() {
    const { filter, onFetchTodos, onRequestTodos } = this.props;
    onRequestTodos(filter);
    onFetchTodos(filter);
  }

  render() {
    const { isFetching, todos } = this.props;
    if (isFetching) {
      return <p style={{ textAlign: 'center' }}>Loading...</p>;
    }
    return <TodoList todos={todos} />;
  }
}

VisibleTodoListRaw.propTypes = {
  filter: PropTypes.string,
  todos: PropTypes.arrayOf(PropTypes.object),
  onFetchTodos: PropTypes.func,
  onRequestTodos: PropTypes.func,
  isFetching: PropTypes.bool,
};


/**
 * params props is added by withRouter decorator
 */
const mapStateToProps = (state, { params }) => ({
  todos: getVisibleTodos(state, params.filter),
  isFetching: getIsFetching(state, params.filter),
  filter: params.filter || 'all',
});

/**
 * The shorter way to write mapDispatchToProps.
 * Used when props and action creator share the same signature
 */
const mapDispatchToProps = {
  onTodoClick: toggleTodo,
  onTodoDelete: deleteTodo,
  onFetchTodos: fetchTodos,
  onRequestTodos: requestTodos,
};

export const VisibleTodoList = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(VisibleTodoListRaw));
