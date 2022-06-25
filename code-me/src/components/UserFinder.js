import { Fragment, Component } from 'react';

import Users from './Users';
import classes from './UserFinder.module.css';
import UsersContext from '../store/users-context';
import ErrorBoundary from './ErrorBoundary';

class UserFinder extends Component {
  // A class component only can connect with one context
  static contextType = UsersContext;

  constructor() {
    super();
    this.state = {
      filteredUsers: [],
      searchTerm: '',
    };
  }

  // Imagine DUMMY_USERS is loaded from a database
  // When the component is rendered for the first time we want to send a request to the server
  componentDidMount() {
    // Send http request
    this.setState({
      filteredUsers: this.context.users,
    });
  }
  // The effect handled in the first render is similar to useEffect with or without parameters, why with? Because that dependency wasn't before and now it is

  componentDidUpdate(_, prevState) {
    // In this case, state change matters
    if (prevState.searchTerm !== this.state.searchTerm) {
      this.setState({
        filteredUsers: this.context.users.filter(user =>
          user.name.includes(this.state.searchTerm)
        ),
      });
    }
  }

  searchChangeHandler(event) {
    this.setState({ searchTerm: event.target.value });
  }

  render() {
    return (
      <Fragment>
        {/* <UsersContext.Consumer>
        </UsersContext.Consumer> */}
        <div className={classes.finder}>
          <input type="search" onChange={this.searchChangeHandler.bind(this)} />
        </div>
        <ErrorBoundary>
          <Users users={this.state.filteredUsers} />
        </ErrorBoundary>
      </Fragment>
    );
  }
}

export default UserFinder;
