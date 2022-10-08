import { Route } from 'react-router-dom';

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
        <Route path="/welcome">
          <Welcome />
        </Route>
        <Route path="/products">
          <Products />
        </Route>
        {/* productId is a dynamic path segment */}
        {/* productId is a name up to you */}
        <Route path="/product-detail/:productId">
          <ProductDetail />
        </Route>
      </main>
    </div>
  );
}

export default App;
