import {
  Route,
  useParams,
  Link,
  useLocation,
  useRouteMatch,
} from 'react-router-dom';

import Comments from '../components/comments/Comments';
import HighlightedQuote from '../components/quotes/HighlightedQuote';
import NotFound from './NotFound';
import useHttp from '../hooks/use-http';
import { getSingleQuote } from '../lib/api';
import { useEffect } from 'react';
import LoadingSpinner from '../components/UI/LoadingSpinner';

// for now
// const DUMMY_QUOTES = [
//   { id: 'q1', author: 'Max', text: 'Learning React is fun!' },
//   { id: 'q2', author: 'Maximilian', text: 'Learning React is great!' },
// ];

const QuoteDetail = () => {
  const {
    sendRequest,
    status,
    data: loadedQuote,
    error,
  } = useHttp(getSingleQuote, true);
  const params = useParams();
  const location = useLocation(); // try: changing to useRouteMatch path
  const match = useRouteMatch();
  // console.log(params, location, match);
  // const currentUrl = location.pathname; // try
  const { quoteId } = params;
  // const quote = DUMMY_QUOTES.find(quote => quote.id === quoteId);

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  if (status === 'pending') {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered focused">{error}</p>;
  }

  // if (!quote) {
  if (!loadedQuote.text) {
    return <p>No quote found!</p>;
  }
  // console.log(location.pathname.split('/').length);
  if (
    !match.isExact &&
    (location.pathname.split('/').length !== 4 ||
      location.pathname.split('/')[3] !== 'comments')
  ) {
    return <NotFound />;
  }
  // const linkOptions = [
  //   { to: `/quotes/${quoteId}/comments`, text: 'Load Comments' },
  //   { to: `/quotes/${quoteId}`, text: 'Hide comments' },
  // ]; // to try
  // match.url gives the path given to the parent route that rendered this component
  // match.path gives the exact path written on the parent route that rendered this component
  const linkOptions = [
    { to: `${match.url}/comments`, text: 'Load Comments' },
    { to: `${match.url}`, text: 'Hide comments' },
  ];
  // const linkProps = currentUrl.includes('comments')
  //   ? linkOptions[1]
  //   : linkOptions[0]; // to try
  const linkProps = match.isExact ? linkOptions[0] : linkOptions[1];
  return (
    <>
      {/* <HighlightedQuote author={quote.author} text={quote.text} /> */}
      <HighlightedQuote author={loadedQuote.author} text={loadedQuote.text} />
      {/* <Route path='/quotes/:quoteId/comments'></Route> */}
      {/* Code commented below is if we want to hide the link when we changed to comments route */}
      {/* <Route path={`/quotes/${quoteId}`} exact>
        <div className="centered">
          <Link className="btn--flat" to={`/quotes/${quoteId}/comments`}>
            Load Comments
          </Link>
        </div>
      </Route> */}
      <div className="centered">
        <Link className="btn--flat" to={linkProps.to}>
          {linkProps.text}
        </Link>
      </div>
      {/* <Route path={`/quotes/${quoteId}/comments`}>
        <Comments />
      </Route> */}
      {/* To keep the params we must use path here */}
      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </>
  );
};

export default QuoteDetail;
