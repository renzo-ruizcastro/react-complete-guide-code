import { render, screen } from '@testing-library/react';
import Async from './Async';

describe('Async component', () => {
  test('renders post if request succeeds', async () => {
    // Arrange
    // you don't have to test things you haven't written
    // when testing something that makes http requests (most importantly others than GET ones) you may not want to affect the backend
    // for this you have to options:
    // 1. Don't send a real request, but mock it
    // 2. Use a testing backend

    // override the fetch function, mock it
    window.fetch = jest.fn();
    // mockResolvedValueOnce take as parameter the value that the mocked function will return when been called
    // since fetch returns a response object with a json method that returns a promise, we have to mock that too
    window.fetch.mockResolvedValueOnce({
      json: async () => [{ id: 'p1', title: 'First post' }],
    });
    // this way we are not sending innececery requests and we can control different outcomes of the mocked function to test different scenarios
    render(<Async />);
    // find* queries return a promise which resolves when an element is found
    const listItemElements = await screen.findAllByRole(
      'listitem',
      {},
      { timeout: 5000 }
    );
    expect(listItemElements).not.toHaveLength(0);
  });
});

// further reading: react-hooks-testing-library