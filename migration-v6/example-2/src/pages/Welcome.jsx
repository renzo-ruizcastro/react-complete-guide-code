// How nested routes work un v6?
// Option 1:
// - Wrap the Route with the Routes component
// - Add /* to the parent path
// - Now the path is relative to the parent path

// Link's "to" path is also relative to the parent path
// You don't need custom path resolving anymore

// Option 2:
// - Define nested routes in the parent route
// - To display the nested Route defined in the parent Route, you should use the Outlet component
// - Outlet is like a placeholder for the nested reoute

import { Routes, Route, Outlet } from 'react-router-dom';

const Welcome = () => {
  return (
    <section>
      <h1>The Welcome Page</h1>
      {/* Below is Option 1 */}
      {/* <Routes>
        <Route path="new-user" element={<p>Welcome, new user!</p>} />
      </Routes> */}
      {/* Below is Option 2 */}
      <Outlet />
    </section>
  );
};

export default Welcome;
