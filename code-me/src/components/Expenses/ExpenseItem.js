import './ExpenseItem.css';
import ExpenseDate from './ExpenseDate';
import Card from '../UI/Card';

const ExpenseItem = props => {
  // const month = props.date.getMonth(); // Number, 0 based
  // const day = props.date.getDay(); // Day name, 0 based (Sunday)

  return (
    <Card className="expense-item">
      <ExpenseDate date={props.date} />
      <div className="expense-item__description">
        <h2>{props.title}</h2>
        <div className="expense-item__price">${props.amount}</div>
      </div>
    </Card>
  );
};

export default ExpenseItem;
