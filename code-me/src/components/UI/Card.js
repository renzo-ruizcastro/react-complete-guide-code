import React from 'react';
import './Card.css';

const Card = props => {
  // className expects an string
  const classes = 'card ' + (props.className || '');
  return <div className={classes}>{props.children}</div>;
};

export default Card;
