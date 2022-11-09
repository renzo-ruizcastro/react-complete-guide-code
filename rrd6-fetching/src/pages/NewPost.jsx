// import { useState } from 'react';
import { useNavigate, redirect, useActionData, useNavigation } from 'react-router-dom';

import NewPostForm from '../components/NewPostForm';
import { savePost } from '../util/api';

function NewPostPage() {
  const data = useActionData();
  console.log(data);
  // const [isSubmitting, setIsSubmitting] = useState(false);
  // const [error, setError] = useState();
  const navigate = useNavigate();
  const navigation = useNavigation(); // gives Navigation information
  // state prop: 'idle' | 'loading' | 'submitting'

  // async function submitHandler(event) {
  //   event.preventDefault();
  //   setIsSubmitting(true);
  //   try {
  //     const formData = new FormData(event.target);
  //     const post = {
  //       title: formData.get('title'),
  //       body: formData.get('post-text'),
  //     };
  //     await savePost(post);
  //     navigate('/');
  //   } catch (err) {
  //     setError(err);
  //   }
  //   setIsSubmitting(false);
  // }

  function cancelHandler() {
    navigate('/blog');
  }

  return (
    <>
      {/* {error && <p>{error.message}</p>} */}
      {data && data.status && <p>{data.message}</p>}
      <NewPostForm
        onCancel={cancelHandler}
        // onSubmit={submitHandler}
        // submitting={isSubmitting}
        // checks if the state is submitting, so we can disable the submitting button
        submitting={navigation.state === 'submitting'}
      />
    </>
  );
}

export default NewPostPage;

export async function action({ request }) {
  const formData = await request.formData();
  const post = {
    title: formData.get('title'),
    body: formData.get('post-text'),
  };
  try {
    await savePost(post);
  } catch (error) {
    if (error.status === 422) {
      // to be done
      // throw error;
      return error; // keeps you in the same page, don't load the neares errorElement page
    }
    throw error;
  }
  return redirect('/blog');
}
