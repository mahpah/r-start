import React from 'react';
import { VisibleTodoList } from './TodoList';
import { AddTodo } from './AddTodo';
import { Footer } from './Footer';

export const TodoApp = ({ params }) => (
  <div className="todo-app">
    <AddTodo />
    <VisibleTodoList filter={params.filter || 'all'} />
    <Footer />
  </div>
);

TodoApp.propTypes = {
  params: React.PropTypes.object,
};
