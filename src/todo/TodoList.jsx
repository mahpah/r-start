import React from 'react';
const { PropTypes, Component } = React;

const Todo = ({
  onClick,
  completed,
  text,
}) => (
  <li
    onClick={onClick}
    style={{
      textDecoration: completed ? 'line-through' : 'initial',
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
  <ul>
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

export class VisibleTodoList extends Component {
  componentDidMount() {
    const { store } = this.context;
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate();
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { store } = this.context;
    const { todos, visibilityFilter } = store.getState();
    const visibleTodos = getVisibleTodos(todos, visibilityFilter);

    const onTodoClick = (id) => {
      store.dispatch({
        type: 'TOGGLE',
        payload: {
          id,
        },
      });
    };

    return (
      <TodoList
        todos={visibleTodos}
        onTodoClick={onTodoClick}
      />
    );
  }
}

VisibleTodoList.contextTypes = {
  store: PropTypes.object,
};
