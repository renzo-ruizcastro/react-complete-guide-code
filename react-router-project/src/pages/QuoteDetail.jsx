import { Route, useParams } from 'react-router-dom';

import Comments from '../components/comments/Comments';
import HighlightedQuote from '../components/quotes/HighlightedQuote';

// for now
const DUMMY_QUOTES = [
  { id: 'q1', author: 'Max', text: 'Learning React is fun!' },
  { id: 'q2', author: 'Maximilian', text: 'Learning React is great!' },
];

const QuoteDetail = () => {
  const params = useParams();
  const quoteId = params.quoteId;
  const quote = DUMMY_QUOTES.find(quote => quote.id === quoteId);
  if (!quote) {
    return <p>No quote found!</p>;
  }
  return (
    <>
      <HighlightedQuote author={quote.author} text={quote.text} />
      {/* <Route path='/quotes/:quoteId/comments'></Route> */}
      <Route path={`/quotes/${quoteId}/comments`}>
        <Comments />
      </Route>
    </>
  );
};

export default QuoteDetail;
