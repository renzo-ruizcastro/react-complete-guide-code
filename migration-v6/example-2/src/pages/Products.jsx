// How navigation is handled in v6?
// - v5 useHistory is replaced by v6 useNavigate
// useNavigate is used to navigate (programatically) when a certain action is triggered (e.g. onClick)

import { Link, useNavigate } from 'react-router-dom';

const Products = () => {
  const navigate = useNavigate();
  // navigate('/welcome'); // By default pushes
  // navigate('/welcome', { replace: true }); // redirect behaviour
  // navigate(-1); // go back
  // navigate(1); // go forward
  // navigate(n) // n > 0 go forward, n < 0 go back
  // navigate(0) // reload? be careful with this one
  return (
    <section>
      <h1>The Products Page</h1>
      <ul>
        <li>
          <Link to="/products/p1">A Book</Link>
        </li>
        <li>
          <Link to="/products/p2">A Carpet</Link>
        </li>
        <li>
          <Link to="/products/p3">An Online Course</Link>
        </li>
      </ul>
    </section>
  );
};

export default Products;
