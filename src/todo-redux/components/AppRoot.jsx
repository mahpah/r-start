import React from 'react';
import { TodoApp } from './TodoApp';
import { Provider } from 'react-redux';
const { PropTypes } = React;

export const AppRoot = ({ store }) => (
  <Provider store={store} >
    <TodoApp />
  </Provider>
);

AppRoot.propTypes = {
  store: PropTypes.object,
};
