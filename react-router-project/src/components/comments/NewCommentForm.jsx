import { useRef, useEffect } from 'react';
import useHttp from '../../hooks/use-http';
import { addComment } from '../../lib/api';
// import { useParams } from 'react-router-dom';
import classes from './NewCommentForm.module.css';
import LoadingSpinner from '../UI/LoadingSpinner';

const NewCommentForm = props => {
  const { sendRequest, status, error } = useHttp(addComment);
  const commentTextRef = useRef();

  // using params here restrict this component to be rendered in a route that has quoteId
  // const { quoteId } = useParams();

  const { onAddedComment, quoteId } = props;

  useEffect(() => {
    if (status === 'completed' && !error) {
      onAddedComment();
    }
  }, [status, error, onAddedComment]);

  const submitFormHandler = event => {
    event.preventDefault();
    const enteredText = commentTextRef.current.value;

    // optional: Could validate here

    // send comment to server
    sendRequest({ commentData: { text: enteredText }, quoteId });
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      {status === 'pending' && (
        <div className="centered">
          <LoadingSpinner />
        </div>
      )}
      <div className={classes.control} onSubmit={submitFormHandler}>
        <label htmlFor="comment">Your Comment</label>
        <textarea id="comment" rows="5" ref={commentTextRef}></textarea>
      </div>
      <div className={classes.actions}>
        <button className="btn">Add Comment</button>
      </div>
    </form>
  );
};

export default NewCommentForm;
