import classes from './NewPostForm.module.css';
// rrd v6 gives us a new way to handle forms
import { Form } from 'react-router-dom';

function NewPostForm({
  // onSubmit,
  submitting,
  onCancel,
}) {
  return (
    // <form className={classes.form} onSubmit={onSubmit}>
    <Form className={classes.form} method="post" action="/blog/new">
      <fieldset>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" name="title" required minLength={5} />
      </fieldset>
      <fieldset>
        <label htmlFor="text">Post Text</label>
        <textarea
          id="text"
          name="post-text"
          required
          minLength={10}
          rows={5}
        ></textarea>
      </fieldset>
      <button type="button" onClick={onCancel} disabled={submitting}>
        Cancel
      </button>
      <button disabled={submitting}>
        {submitting ? 'Submitting...' : 'Create Post'}
      </button>
    </Form>
    // </form>
  );
}

export default NewPostForm;
