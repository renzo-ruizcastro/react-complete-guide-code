import React, { useState } from 'react';
import AddUser from './components/Users/AddUser';
import UsersList from './components/Users/UsersList';

function App() {
  const [usersLists, setUsersList] = useState([]);
  const addUserHandler = user => {
    setUsersList(prevUserList => [...prevUserList, user]);
  };
  return (
    <div>
      <AddUser onAddUser={addUserHandler} />
      <UsersList users={usersLists} />
    </div>
  );
}

export default App;
