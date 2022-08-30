import React from 'react';
import { useSelector, useDispatch, connect } from 'react-redux';
import classes from './Counter.module.css';
import { counterActions } from '../store/counter-slice';

// FC

const Counter = () => {
  const dispatch = useDispatch();
  // const counter = useSelector(state => state.counter);
  const counter = useSelector(state => state.counter.counter);
  // const showCounter = useSelector(state => state.showCounter);
  const showCounter = useSelector(state => state.counter.showCounter);
  // Using a selector automatically subscribes the component to the store
  // Changes to store will automatically update the component

  // Be careful with action key names
  const incrementHandler = () => {
    dispatch(counterActions.increment());
    // dispatch({ type: 'INCREMENT' });
  };
  const decrementHandler = () => {
    dispatch(counterActions.decrement());
    // dispatch({ type: 'DECREMENT' });
  };

  const increaseHandler = () => {
    dispatch(counterActions.increase(5));
    // dispatch({ type: 'INCREASE', value: 5 });
  };

  const toggleCounterHandler = () => {
    dispatch(counterActions.toggleCounter());
    // dispatch({ type: 'TOGGLE_COUNTER' });
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {showCounter && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={increaseHandler}>Increase by 5</button>
        <button onClick={decrementHandler}>Decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;

// CC
// It's worth knowing about how to use Redux with cc

// class Counter extends React.Component {
//   incrementHandler = () => {
//     this.props.increment();
//   };
//   decrementHandler = () => {
//     this.props.decrement();
//   };
//   toggleCounterHandler = () => {};

//   render() {
//     // You can use connect in fc o cc
//     return (
//       <main className={classes.counter}>
//         <h1>Redux Counter</h1>
//         <div className={classes.value}>{this.props.counter}</div>
//         <div>
//           <button onClick={this.incrementHandler.bind(this)}>Increment</button>
//           <button onClick={this.decrementHandler.bind(this)}>Decrement</button>
//         </div>
//         <button onClick={this.toggleCounterHandler}>Toggle Counter</button>
//       </main>
//     );
//   }
// }

// // name is a convention
// const mapStateToProps = state => {
//   return {
//     counter: state.counter,
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     increment: () => dispatch({ type: 'INCREMENT' }),
//     decrement: () => dispatch({ type: 'DECREMENT' }),
//   };
// };

// // connect is a high order component
// // connect subscribes the component to the store
// export default connect(mapStateToProps, mapDispatchToProps)(Counter);
