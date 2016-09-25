import React from 'react';
const { PropTypes } = React;
import { Link } from 'react-router';

const linkStyle = {
  textTransform: 'uppercase',
  fontFamily: 'sans-serif',
  color: '#888',
  letterSpacing: '2px',
  fontSize: '.8em',
  textDecoration: 'none',
};
const FilterLink = ({
  filter,
  children,
}) => (
  <Link
    style={linkStyle}
    to={filter === 'all' ? '' : filter}
    activeStyle={{ color: '#222' }}
  >
    {children}
  </Link>
);

FilterLink.propTypes = {
  filter: PropTypes.string,
  children: PropTypes.node,
};

/**
 * Present component
 */
export const Footer = () => (
  <div>
    <FilterLink
      filter="all"
    >All</FilterLink>&nbsp;
    <FilterLink
      filter="completed"
    >Completed</FilterLink>&nbsp;
    <FilterLink
      filter="pending"
    >Active</FilterLink>&nbsp;
  </div>
);

