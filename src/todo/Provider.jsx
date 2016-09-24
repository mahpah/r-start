import React from 'react';
const { Component, PropTypes } = React;

export class Provider extends Component {
  getChildContext() {
    return {
      store: this.props.store,
    };
  }

  render() {
    return this.props.children;
  }
}

Provider.propTypes = {
  children: PropTypes.node,
  store: PropTypes.object,
};

Provider.childContextTypes = {
  store: PropTypes.object,
};
