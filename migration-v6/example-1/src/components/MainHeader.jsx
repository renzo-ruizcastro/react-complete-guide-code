// 1.- activeClassName is no more in v6, now we can use either className or style props, both recieve a callback function which param is an object which has navigation data. In specific, it has a property called isActive which is a boolean value that indicates if the current route matches the "to" prop.
// 2.-

import { NavLink } from 'react-router-dom';

import classes from './MainHeader.module.css';

const MainHeader = () => {
  return (
    <header className={classes.header}>
      <nav>
        <ul>
          <li>
            <NavLink
              className={navData => (navData.isActive ? classes.active : '')}
              to="/welcome"
            >
              Welcome
            </NavLink>
          </li>
          <li>
            <NavLink
              className={navData => (navData.isActive ? classes.active : '')}
              to="/products"
            >
              Products
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
