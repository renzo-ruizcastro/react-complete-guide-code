import { useEffect } from 'react';
import QuoteForm from '../components/quotes/QuoteForm';
import { useHistory } from 'react-router-dom';
import useHttp from '../hooks/use-http';
import { addQuote } from '../lib/api';

const NewQuote = () => {
  const { sendRequest, status } = useHttp(addQuote);
  // history of pages visited
  const history = useHistory();

  useEffect(() => {
    if (status === 'completed') {
      history.push('/quotes');
    }
  }, [status, history]);
  // we must add history even if it is ensured that it will not change

  const addQuoteHandler = quoteData => {
    // console.log(quoteData);
    // programatically navigate to another page
    // history.push('/quotes');
    sendRequest(quoteData);
  };
  return (
    <QuoteForm isLoading={status === 'pending'} onAddQuote={addQuoteHandler} />
  );
};

export default NewQuote;
