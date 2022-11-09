import { Suspense } from 'react';
import { useLoaderData, defer, Await } from 'react-router-dom';

import Posts from '../components/Posts';
import { getSlowPosts } from '../util/api';

function DeferredBlogPosts() {
  const loaderData = useLoaderData();
  return (
    <>
      <h1>Our Blog Posts</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <Await
          resolve={loaderData.posts}
          errorElement={<p>Error loading blog posts.</p>}
        >
          {loadedPosts => <Posts blogPosts={loadedPosts} />}
        </Await>
      </Suspense>

      {/* <Posts blogPosts={loaderData} /> */}
    </>
  );
}

export default DeferredBlogPosts;

export async function loader() {
  // using await here will cause the entire page to wait for the data to load, not showing any content until then
  //   return defer({ posts: await getSlowPosts() });
  return defer({ posts: getSlowPosts() });
}
