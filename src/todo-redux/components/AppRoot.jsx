import React from 'react';
import { TodoApp } from './TodoApp';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
const { PropTypes } = React;

export const AppRoot = ({ store }) => (
  <Provider store={store} >
    <Router history={browserHistory}>
      <Route path="/(:filter)" component={TodoApp} />
    </Router>
  </Provider>
);

AppRoot.propTypes = {
  store: PropTypes.object,
};
