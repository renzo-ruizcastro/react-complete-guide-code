import {
  Routes,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Navigate,
} from 'react-router-dom';
import { useContext } from 'react';

import AuthContext from './store/auth-context';

import RootLayout from './components/Layout/RootLayout';
import ProfilePage from './pages/ProfilePage';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';

const ProtectedRoute = ({ needsLogin }) => {
  const { isLoggedIn } = useContext(AuthContext);
  if (needsLogin) {
    return isLoggedIn ? <Outlet /> : <Navigate to="/auth" />;
  } else {
    return !isLoggedIn ? <Outlet /> : <Navigate to="/" />;
  }
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<HomePage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="auth" element={<AuthPage />} />
      </Route>
      <Route element={<ProtectedRoute needsLogin />}>
        <Route path="profile" element={<ProfilePage />} />
      </Route>
      <Route path="*" element={<h1>Not found</h1>} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
