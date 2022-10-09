import { useHistory, useLocation } from 'react-router-dom';
import { Fragment } from 'react';

import QuoteItem from './QuoteItem';
import classes from './QuoteList.module.css';

const sortQuotes = (quotes, ascending) => {
  return quotes.sort((quoteA, quoteB) => {
    if (ascending) {
      return quoteA.id > quoteB.id ? 1 : -1;
    } else {
      return quoteA.id < quoteB.id ? 1 : -1;
    }
  });
};

const QuoteList = props => {
  // we can use useHistory to add query params to the URL
  const history = useHistory();
  // we can use useLocation to read the query params from the URL
  // useLocation give us access to the location object which has information about the current URL
  const location = useLocation();
  console.log(location);
  const queryParams = new URLSearchParams(location.search);
  const isSortingAscending = queryParams.get('sort') === 'asc';
  const sortedQuotes = sortQuotes(props.quotes, isSortingAscending);

  const changeSortingHandler = event => {
    // ? preceeds the query params
    // pushing actually re-renders the component
    history.push('/quotes?sort=' + (isSortingAscending ? 'desc' : 'asc'));
  };
  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={changeSortingHandler}>
          Sort {isSortingAscending ? 'Descending' : 'Ascending'}
        </button>
      </div>
      <ul className={classes.list}>
        {sortedQuotes.map(quote => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;
