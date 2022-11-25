import { render, screen } from '@testing-library/react';
import Greeting from './Greeting';

// with cra configuration test() and expect() globally available
test('renders Hello World as a text', () => {
  // 3 A's
  // Arrange -> setup the test data, conditions and environment
  render(<Greeting />);
  // Act -> execute the code under test
  // in this case, render() is the code under test

  // Assert -> verify the result
  const helloWorldElement = screen.getByText('Hello World!', {
    // true by default
    // false -> case insensitive, allow substrings
    exact: false,
  });
  expect(helloWorldElement).toBeInTheDocument();
  // if you want to check if some element is not in the document
  // you can add .not before .toBeInTheDocument()
  // but this requires to get the element via queryBy* methods
  // because getBy* methods throw an error if the element is not found and queryBy* methods return a promise
});
