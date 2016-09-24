import React from 'react';
const { PropTypes, Component } = React;

/**
 * Present component
 */
const Link = ({
  active,
  onClick,
  children,
}) => {
  const style = {
    textTransform: 'uppercase',
    fontFamily: 'sans-serif',
    color: active ? '#ddd' : '#222',
    letterSpacing: '2px',
    fontSize: '.8em',
  };
  return (
    <a
      style={style}
      onClick={onClick}
    >
      {children}
    </a>
  );
};

Link.propTypes = {
  active: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node,
};

/**
 * Container component, which read state and dispatch action
 */
class FilterLink extends Component {
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
    const {
      children,
      filter,
    } = this.props;
    const { store } = this.context;
    const currentFilter = store.getState().visibilityFilter;

    const setFilter = () => {
      store.dispatch({
        type: 'SET_FILTER',
        payload: filter,
      });
    };

    return (
      <Link onClick={setFilter} active={currentFilter === filter}>
        {children}
      </Link>
    );
  }
}

FilterLink.propTypes = {
  children: PropTypes.node,
  filter: PropTypes.string,
};

FilterLink.contextTypes = {
  store: PropTypes.object,
};

/**
 * Present component
 */
export const Footer = () => (
  <div>
    <FilterLink
      filter="SHOW_ALL"
    >All</FilterLink>&nbsp;
    <FilterLink
      filter="SHOW_COMPLETED"
    >Completed</FilterLink>&nbsp;
    <FilterLink
      filter="SHOW_PENDING"
    >Active</FilterLink>&nbsp;
  </div>
);

