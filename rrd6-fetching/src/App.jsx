import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  // BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';

import BlogLayout from './pages/BlogLayout';
import BlogPostsPage, { loader as blogPostsLoader } from './pages/BlogPosts';
import NewPostPage, { action as newPostAction } from './pages/NewPost';
import { action as newsletterAction } from './pages/Newsletter';
import PostDetailPage, { loader as postDetailLoader } from './pages/PostDetail';
import RootLayout from './pages/RootLayout';
import WelcomePage from './pages/Welcome';
import ErrorPage from './pages/Error';
import DeferredBlogPostsPage, {
  loader as deferredBlogPostsLoader,
} from './pages/DeferredBlogPosts';

// const router = createBrowserRouter([
//   {path: '/', element: <WelcomePage />},
//   ...
// ]);

const router = createBrowserRouter(
  createRoutesFromElements(
    // Route here, not Routes
    // You can add an error element at any level of the routes
    // Take into account that errors would bubble up, catching the first route which has an errorElement prop
    <Route path="/" element={<RootLayout />} errorElement={<ErrorPage />}>
      {/* index routes are default routes when the parent route is called */}
      <Route index element={<WelcomePage />} />
      <Route path="/blog" element={<BlogLayout />}>
        {/* <Route index element={<BlogPostsPage />} loader={blogPostsLoader} /> */}
        <Route
          index
          element={<DeferredBlogPostsPage />}
          loader={deferredBlogPostsLoader}
        />

        <Route
          path=":id"
          element={<PostDetailPage />}
          loader={postDetailLoader}
          // errorElement={<p>An error ocurred</p>}
        />
      </Route>
      <Route
        path="/blog/new"
        element={<NewPostPage />}
        action={newPostAction}
      />
      <Route path="/newsletter" action={newsletterAction} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
