import React, { useState } from 'react';
import axios from 'axios';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // const dummyMovies = [
  //   {
  //     id: 1,
  //     title: 'Some Dummy Movie',
  //     openingText: 'This is the opening text of the movie',
  //     releaseDate: '2021-05-18',
  //   },
  //   {
  //     id: 2,
  //     title: 'Some Dummy Movie 2',
  //     openingText: 'This is the second opening text of the movie',
  //     releaseDate: '2021-05-19',
  //   },
  // ];

  // function fetchMoviesHandler() {
  //   fetch('https://swapi.dev/api/films/')
  //     .then(response => {
  //       console.log(response, typeof response);
  //       return response.json();
  //     })
  //     .then(data => {
  //       console.log(data, typeof data);
  //     });
  // }

  // function fetchMoviesHandler() {
  //   // Sending a HTTP request is a asynchronous operation
  //   fetch('https://swapi.dev/api/films/')
  //     .then(response => {
  //       // The response originally is a Response object
  //       return response.json(); // .json() returns a promise to give the response's body converted to JSON
  //     })
  //     .then(data => {
  //       const transformedMovies = data.results.map(movie => {
  //         return {
  //           id: movie.episode_id,
  //           title: movie.title,
  //           openingText: movie.opening_crawl,
  //           releaseDate: movie.release_date,
  //         };
  //       });
  //       setMovies(transformedMovies);
  //     }); // returns a promise
  //   // fetch receives as second parameter an object with options, one of them is the method (GET, POST, PUT, DELETE)
  //   // by default the method is GET
  // }

  // async function fetchMoviesHandler() {
  //   // Use await whenever it's returning a promise
  //   const response = await fetch('https://swapi.dev/api/films/');
  //   const data = await response.json();
  //   // The lines above are equivalent to use then()
  //   const transformedMovies = data.results.map(movie => {
  //     return {
  //       id: movie.episode_id,
  //       title: movie.title,
  //       openingText: movie.opening_crawl,
  //       releaseDate: movie.release_date,
  //     };
  //   })
  //   setMovies(transformedMovies);
  // }

  // function fetchMoviesHandler() {
  //   // axios seems to be faster than fetch
  //   axios.get('https://swapi.dev/api/films/')
  //     // axios returns an object with a property called data in which we can access the response body already converted to JSON
  //     .then(response => {
  //       const transformedMovies = response.data.results.map(movie => {
  //         return {
  //           id: movie.episode_id,
  //           title: movie.title,
  //           openingText: movie.opening_crawl,
  //           releaseDate: movie.release_date,
  //         };
  //       });
  //       setMovies(transformedMovies);
  //     })
  // }

  async function fetchMoviesHandler() {
    setIsLoading(true);
    const response = await axios.get('https://swapi.dev/api/films/');
    const transformedMovies = response.data.results.map(movie => {
      return {
        id: movie.episode_id,
        title: movie.title,
        openingText: movie.opening_crawl,
        releaseDate: movie.release_date,
      };
    });
    setMovies(transformedMovies);
    setIsLoading(false);
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && <p>Found no movies</p>}
        {isLoading && <p>Loading...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
