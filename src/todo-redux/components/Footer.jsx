import React from 'react';
const { PropTypes } = React;
import { connect } from 'react-redux';
import { setVisibilityFilter } from '../actions';

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
 * @param {object} props Container's own props, not Present's props
 */
const stateToProp = (state, props) => ({
  active: props.filter === state.visibilityFilter,
});

const dispatchToProp = (dispatch, props) => ({
  onClick: () => {
    dispatch(setVisibilityFilter(props.filter));
  },
});

const FilterLink = connect(
  stateToProp,
  dispatchToProp
)(Link);

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

