import React from 'react';
import { VisibleTodoList } from './TodoList';
import { AddTodo } from './AddTodo';
import { Footer } from './Footer';

export const TodoApp = () => (
  <div className="todo-app">
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
);

// TodoApp.propTypes = {
//   params: React.PropTypes.shape({
//     filter: React.PropTypes.string,
//   }),
// };
