// This is handled by the ExpensesList component
// import ExpenseItem from './ExpenseItem';

import ExpensesFilter from './ExpensesFilter';
import Card from '../UI/Card';
import './Expenses.css';
import { useState } from 'react';
import ExpensesList from './ExpensesList';

const Expenses = props => {
  const [filteredYear, setFilteredYear] = useState('2020');
  const filterChangeHandler = selectedYear => {
    setFilteredYear(selectedYear);
  };
  const filteredExpenses = props.items.filter(
    // getFullYear() returns a number
    expense => expense.date.getFullYear() === +filteredYear
  );

  // Third approach
  // let expensesContent = <p>No expenses found.</p>;
  // if (filteredExpenses.length > 0) {
  //   expensesContent = filteredExpenses.map(item => (
  //     <ExpenseItem
  //       key={item.id}
  //       title={item.title}
  //       amount={item.amount}
  //       date={item.date}
  //     />
  //   ));
  // }
  // We passed the code above to ExpensesList component

  return (
    <Card className="expenses">
      <ExpensesFilter
        selectedYear={filteredYear}
        onFilterChange={filterChangeHandler}
      />
      {/* Displaying all items */}
      {/* {props.items.map(item => (
        <ExpenseItem
          key={item.id}
          title={item.title}
          amount={item.amount}
          date={item.date}
        />
      ))} */}
      {/* Displaying filtered items */}
      {/* {filteredExpenses.map(item => (
        <ExpenseItem
          key={item.id}
          title={item.title}
          amount={item.amount}
          date={item.date}
        />
      ))} */}
      {/* Handling conditional displaying */}
      {/* First approach */}
      {/* {filteredExpenses.length === 0 ? (
        <p>No expenses found.</p>
      ) : (
        filteredExpenses.map(item => (
          <ExpenseItem
            key={item.id}
            title={item.title}
            amount={item.amount}
            date={item.date}
          />
        ))
      )} */}
      {/* Second approach */}
      {/* {filteredExpenses.length === 0 && <p>No expenses found.</p>} */}
      {/* {filteredExpenses.length > 0 &&
        filteredExpenses.map(item => (
          <ExpenseItem
            key={item.id}
            title={item.title}
            amount={item.amount}
            date={item.date}
          />
        ))} */}
      {/* Third approach */}
      {/* {expensesContent} */}
      <ExpensesList items={filteredExpenses} />
    </Card>
  );
};

export default Expenses;
