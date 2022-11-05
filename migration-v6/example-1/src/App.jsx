// 1.- Switch doesn't exists in v6, instead we use Routes
// 2.- The Route component no longer wraps the component to render, instead we use the element prop
// 3.- exact prop is no longer needed, rrd v6 will match the first route that matches the path
// 4.- If you want to keep the behaviour of v5 route paths without exact, thus matching any path that starts with the given path, you can use path/* instead of path. However if in Routes there is a better match, that will be used instead.
// 5.- The previous point also implies that the order doesn't matter anymore, the best match will be used.

import {
  // Switch,
  Routes,
  Route,
} from 'react-router-dom';

import Welcome from './pages/Welcome';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import MainHeader from './components/MainHeader';

function App() {
  return (
    <div>
      <MainHeader />
      <main>
        {/* Here was the Switch wrapper component */}
        <Routes>
          <Route path="/welcome" element={<Welcome />} />
          {/* <Route path="/products/*" element={<Products />}> */}
          <Route path="/products" element={<Products />} />
          <Route path="/products/:productId" element={<ProductDetail />} />
          {/* <Route path="/products/edit" element={<h1>Hello Edit</h1>} /> */}
        </Routes>
      </main>
    </div>
  );
}

export default App;

// our-domain.com/welcome => Welcome Component
// our-domain.com/products => Products Component
// our-domain.com/product-detail/a-book
