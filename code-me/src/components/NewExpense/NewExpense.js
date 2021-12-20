import './NewExpense.css';
import ExpenseForm from './ExpenseForm';

const NewExpense = props => {
  // const saveExpenseDataHandler = enteredExpenseData => {
  //   const expenseData = { ...enteredExpenseData, id: Math.random().toString() };
  //   props.addExpense(expenseData);
  // };

  return (
    <div className="new-expense">
      {/* <ExpenseForm onSaveExpenseData={saveExpenseDataHandler} /> */}
      {/* Saving uplifting code */}
      <ExpenseForm onAddExpense={props.onAddExpense} />
    </div>
  );
};

export default NewExpense;
