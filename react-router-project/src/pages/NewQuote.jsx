import QuoteForm from '../components/quotes/QuoteForm';
import { useHistory } from 'react-router-dom';

const NewQuote = () => {
  // history of pages visited
  const history = useHistory();
  const addQuoteHandler = quoteData => {
    console.log(quoteData);
    // programatically navigate to another page
    history.push('/quotes');
  };
  return <QuoteForm onAddQuote={addQuoteHandler} />;
};

export default NewQuote;
