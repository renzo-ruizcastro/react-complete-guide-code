// import { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';

import { useLoaderData } from 'react-router-dom';
import BlogPost from '../components/BlogPost';
import { getPost } from '../util/api';

function PostDetailPage() {
  const post = useLoaderData();
  // const [error, setError] = useState();
  // const [post, setPost] = useState();
  // const [isLoading, setIsLoading] = useState(false);

  // const params = useParams();
  // const { id } = params;

  // useEffect(() => {
  //   async function loadPost() {
  //     setIsLoading(true);
  //     try {
  //       const post = await getPost(id);
  //       setPost(post);
  //     } catch (err) {
  //       setError(err.message);
  //     }
  //     setIsLoading(false);
  //   }

  //   loadPost();
  // }, [id]);

  return (
    <>
      {/* {isLoading && <p>Loading post...</p>}
      {error && <p>{error.message}</p>}
      {!error && post && <BlogPost title={post.title} text={post.body} />} */}
      <BlogPost title={post.title} text={post.body} />
    </>
  );
}

export default PostDetailPage;

// An object is always passed to the loader function by react-router-dom
// another property is request
export function loader({ params }) {
  const postId = params.id;
  return getPost(postId);
}
