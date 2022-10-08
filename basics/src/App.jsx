import { Route, Switch, Redirect } from 'react-router-dom';

import MainHeader from './components/MainHeader';
import Welcome from './pages/Welcome';
import Products from './pages/Products';

import ProductDetail from './pages/ProductDetail';

function App() {
  return (
    <div>
      {/* <h2>Let's get started!</h2> */}
      <MainHeader />
      <main>
        {/* Switch only shows in screen one route page */}
        <Switch>
          {/* exact here matters because every path starts with '/' */}
          <Route path="/" exact>
            <Redirect to="/welcome" />
          </Route>
          <Route path="/welcome">
            <Welcome />
          </Route>
          {/* Matching paths in router means, starting with the same path */}
          {/* Exact prop requires the full path to match with the given one */}
          <Route path="/products" exact>
            <Products />
          </Route>
          {/* productId is a dynamic path segment */}
          {/* productId is a name up to you */}
          <Route path="/products/:productId">
            <ProductDetail />
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
