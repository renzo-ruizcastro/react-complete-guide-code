import './NewExpense.css';
import ExpenseForm from './ExpenseForm';
import { useState } from 'react';

const NewExpense = props => {
  const [isEditing, setIsEditing] = useState(false);
  const editingHandler = () => {
    setIsEditing(prev => !prev);
  };
  return (
    <div className="new-expense">
      {!isEditing ? (
        <button onClick={editingHandler}>Add New Expense</button>
      ) : (
        <ExpenseForm
          onAddExpense={props.onAddExpense}
          onClose={editingHandler}
        />
      )}
    </div>
  );
};

export default NewExpense;
