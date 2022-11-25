import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Greeting from './Greeting';

// with cra configuration describe(), test() and expect() globally available
// describe() creates a test suite
describe('Greeting component', () => {
  afterEach(
    // cleanup() is a utility function that unmounts React trees that were mounted with render()
    cleanup
  );
  // you can have multiple test() functions in a describe() block
  test('renders Hello World as a text', () => {
    // 3 A's
    // Arrange -> setup the test data, conditions and environment
    render(<Greeting />);
    // Act -> execute the code under test
    // in this case, render() is the code under test

    // Assert -> verify the result
    // here you can also use regex
    const helloWorldElement = screen.getByText('Hello World!', {
      // true by default
      // false -> case insensitive, allow substrings
      exact: false,
    });
    expect(helloWorldElement).toBeInTheDocument();
    // if you want to check if some element is not in the document
    // you can add .not before .toBeInTheDocument()
    // but this requires to get the element via queryBy* methods
    // because getBy* methods throw an error if the element is not found and queryBy* methods return null
  });

  test('renders some text and hide another text when button is clicked', () => {
    // Arrange
    render(<Greeting />);
    const textToAppear = 'Changed!';
    const textToDisappear = "It's good to see you!";
    let textToAppearElement;
    let textToDisappearElement;
    const selectElements = () => {
      textToAppearElement = screen.queryByText(textToAppear);
      textToDisappearElement = screen.queryByText(textToDisappear);
    };

    // 1st Act
    // render() is the code under test

    // 1st Assert
    selectElements();
    expect(textToAppearElement).toBeNull();
    expect(textToDisappearElement).toBeInTheDocument();

    // 2nd Act
    const buttonElement = screen.getByRole('button');
    userEvent.click(buttonElement);

    // 2nd Assert
    selectElements();
    expect(textToAppearElement).toBeInTheDocument();
    expect(textToDisappearElement).toBeNull();
  });
});
