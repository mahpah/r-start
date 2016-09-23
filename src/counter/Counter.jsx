import React from 'react';
const { PropTypes } = React;

export const Counter = ({
  value,
  onIncrease,
  onDecrease,
}) => (
  <div>
    <h2>{value}</h2>
    <button onClick={onIncrease}>+</button>
    <button onClick={onDecrease}>-</button>
  </div>
);

Counter.propTypes = {
  value: PropTypes.number,
  onIncrease: PropTypes.func,
  onDecrease: PropTypes.func,
};
