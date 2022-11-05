// 1.- Redirect component is not in v6, instead use the component Navigate
// 2.- Navigate as it is will push the route, if you want to have the Redirect behavior, you need to add the replace prop

// Nested routes
// Option 2:
// - Nested routes are Route components wrapped in a Route component
// - Adding /* is not necessary here

// Further investigation: Route component index prop

import {
  // Switch, // not in v6
  Routes,
  Route,
  // Redirect, // not in v6
  Navigate, // use instead
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
        <Routes>
          <Route path="/" element={<Navigate replace to="/welcome" />} />
          <Route
            path="/welcome"
            // path="/welcome/*" // Nested routes Option 1
            element={<Welcome />}
          >
            <Route path="new-user" element={<p>Welcome, new user!</p>} />
          </Route>
          <Route path="/products" element={<Products />} />
          <Route path="/products/:productId" element={<ProductDetail />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

// our-domain.com/welcome => Welcome Component
// our-domain.com/products => Products Component
// our-domain.com/product-detail/a-book
