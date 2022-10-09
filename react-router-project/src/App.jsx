import { Switch, Route, Redirect } from 'react-router-dom';
import Layout from './components/layout/Layout';
import AllQuotes from './pages/AllQuotes';
import QuoteDetail from './pages/QuoteDetail';
import NewQuote from './pages/NewQuote';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/quotes" />
        </Route>
        {/* adding exact here avoid selecting this route when looking for a quote detail since they share the same starting path '/quote' */}
        <Route path="/quotes" exact>
          <AllQuotes />
        </Route>
        {/* Query parameters don't affect the matching */}
        {/* But this identification segment does */}
        <Route path="/quotes/:quoteId">
          <QuoteDetail />
        </Route>
        <Route path="/new-quote">
          <NewQuote />
        </Route>
        {/* Any url should match, that's why it is last */}
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
