import MainNavigation from '../components/MainNavigation';
// To print error data you can use useRouteError hook
import { useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();
  return (
    <>
      <MainNavigation />
      <main id="error-content">
        <h1>Page Not Found</h1>
        <p>{error?.message}</p>
      </main>
    </>
  );
};

export default ErrorPage;
