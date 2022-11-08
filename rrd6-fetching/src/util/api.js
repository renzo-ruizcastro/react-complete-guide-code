const FIREBASE_DOMAIN = 'https://jsonplaceholder.typicode.com';

function FetchingException(errorData) {
  this.message = errorData.message;
  this.code = errorData.code;
  this.name = 'FetchingException';
}

export async function getPosts() {
  const response = await fetch(`${FIREBASE_DOMAIN}/posts`);
  if (!response.ok) {
    throw new FetchingException({
      message: 'Failed to fetch posts.',
      status: 500,
    });
  }
  return response.json();
}

export async function getPost(id) {
  const response = await fetch(`${FIREBASE_DOMAIN}/posts/${id}`);
  if (!response.ok) {
    throw new FetchingException({
      message: 'Failed to fetch post.',
      status: 500,
    });
  }
  return response.json();
}

export async function savePost(post) {
  if (post.title.trim().length < 5 || post.body.trim().length < 10) {
    throw new FetchingException({
      message: 'Invalid input data provided.',
      status: 422,
    });
  }

  const response = await fetch(`${FIREBASE_DOMAIN}/posts`, {
    method: 'POST',
    body: JSON.stringify(post),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new FetchingException({
      message: 'Could not save post.',
      status: 500,
    });
  }
}
