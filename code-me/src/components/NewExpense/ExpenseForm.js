import './ExpenseForm.css';
import { useState } from 'react';

const ExpenseForm = () => {
  const [enteredTitle, setEnteredTitle] = useState('');
  const [enteredAmount, setEnteredAmount] = useState('');
  const [enteredDate, setEnteredDate] = useState('');
  // // Using one state instead ------------------------------
  // const [userInput, setUserInput] = useState({
  //   enteredTitle: '',
  //   enteredAmount: '',
  //   enteredDate: '',
  // });

  const titleChangeHandler = e => {
    setEnteredTitle(e.target.value);
    // Using one state instead ------------------------------
    // setUserInput({ ...userInput, enteredTitle: e.target.value }); // This is not a good way to do it
    // setUserInput(prevState => {
    //   return { ...prevState, enteredTitle: e.target.value };
    // });
  };
  const amountChangeHandler = e => {
    setEnteredAmount(e.target.value);
    // Using one state instead ------------------------------
    // setUserInput({ ...userInput, enteredAmount: e.target.value });
  };
  const dateChangeHandler = e => {
    setEnteredDate(e.target.value);
    // Using one state instead ------------------------------
    // setUserInput({ ...userInput, enteredDate: e.target.value });
  };

  const submitHandler = e => {
    e.preventDefault();
    const expenseData = {
      title: enteredTitle,
      amount: enteredAmount,
      date: new Date(enteredDate), // We want a Date object, not a string here
    };
    console.log(expenseData);
    // Cleaning fields
    setEnteredTitle('');
    setEnteredAmount('');
    setEnteredDate('');
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label>Title</label>
          <input
            type="text"
            value={enteredTitle}
            // Using one state instead ------------------------------
            // value={userInput.enteredTitle}
            onChange={titleChangeHandler}
          />
        </div>
        <div className="new-expense__control">
          <label>Amount</label>
          <input
            type="number"
            min="0.01"
            step="0.01"
            value={enteredAmount}
            // Using one state instead ------------------------------
            // value={userInput.enteredAmount}
            onChange={amountChangeHandler}
          />
        </div>
        <div className="new-expense__control">
          <label>Date</label>
          <input
            type="date"
            min="2019-01-01"
            max="2022-12-31"
            value={enteredDate}
            // Using one state instead ------------------------------
            // value={userInput.enteredDate}
            onChange={dateChangeHandler}
          />
        </div>
      </div>
      <div className="new-expense__actions">
        <button type="submit">Add expense</button>
      </div>
    </form>
  );
};

export default ExpenseForm;
