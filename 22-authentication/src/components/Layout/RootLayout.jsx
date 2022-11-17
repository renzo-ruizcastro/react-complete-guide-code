import MainNavigation from './MainNavigation';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
