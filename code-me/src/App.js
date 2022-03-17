import React, { useContext } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './context/auth-context';

function App() {
  // Replaced using a custom context provider component
  /*
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(
    // 1st: It's a function, not necessarily an anonymus function
    () => {
      // The code here could be performance expensive
      const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');
      if (storedUserLoggedInInformation === '1') {
        // triggers a re-evaluation of the component, but here useEffect won't be called again because its arguments (none) have not changed
        setIsLoggedIn(true);
      }
    },
    // 2nd: It's an array of dependencies, if the dependencies change, the function will be re-run
    // If the array of dependencies is empty, the function will be run only once when the component is mounted
    []
  );

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    setIsLoggedIn(true);
    // the value stored is a string
    console.log(email, password);
    localStorage.setItem('isLoggedIn', '1');
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };
  */

  const ctx = useContext(AuthContext);

  return (
    <React.Fragment>
      <MainHeader />
      <main>
        {/* Here the data passed is directly so there's no need to use context */}
        {!ctx.isLoggedIn && <Login />}
        {ctx.isLoggedIn && <Home />}
      </main>
    </React.Fragment>
  );
}

export default App;
