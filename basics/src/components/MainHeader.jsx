import { NavLink, Link } from 'react-router-dom';

import styles from './MainHeader.module.css';

const MainHeader = () => {
  return (
    <header className={styles.header}>
      <nav>
        <ul>
          <li>
            {/* <a href="/welcome">Welcome</a> */}
            {/* <Link to="/welcome">Welcome</Link> */}
            {/* NavLink adds a class to the active link */}
            <NavLink activeClassName={styles.active} to="/welcome">
              Welcome
            </NavLink>
          </li>
          <li>
            {/* <a href="/products">Products</a> */}
            {/* <Link to="/products">Products</Link> */}
            <NavLink activeClassName={styles.active} to="/products">
              Products
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
