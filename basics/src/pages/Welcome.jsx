import { Route } from 'react-router-dom';

const Welcome = () => {
  return (
    <>
      <h1>The Welcome Page</h1>
      {/* If the page is active the route will be evaluated */}
      <Route path="/welcome/new-user">
        <p>Welcome, new user!</p>
      </Route>
    </>
  );
};

export default Welcome;
