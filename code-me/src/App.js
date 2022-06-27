import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

import MoviesList from './components/MoviesList';
import AddMovie from './components/AddMovie';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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
  //   setIsLoading(true);
  //   setError(null);
  //   fetch('https://swapi.dev/api/films/')
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error(response.status);
  //       }
  //       return response.json();
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
  //     })
  //     .catch(err => {
  //       setError(err.message);
  //     });
  //   setIsLoading(false);
  // }

  // async function fetchMoviesHandler() {
  //   setIsLoading(true);
  //   setError(null);
  //   try {
  //     const response = await fetch('https://swapi.dev/api/films/');
  //     console.log(response);
  //     if (!response.ok) {
  //       throw new Error(response.status);
  //     }
  //     // Some APIs still send back JSON data even if the request was not successful and some, none
  //     const data = await response.json();
  //     const transformedMovies = data.results.map(movie => {
  //       return {
  //         id: movie.episode_id,
  //         title: movie.title,
  //         openingText: movie.opening_crawl,
  //         releaseDate: movie.release_date,
  //       };
  //     })
  //     setMovies(transformedMovies);
  //   } catch(err) {
  //     setError(err.message);
  //   }
  //   setIsLoading(false);
  // }

  // function fetchMoviesHandler() {
  //   setIsLoading(true);
  //   setError(null);
  //   axios
  //     .get('https://swapi.dev/api/film/')
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
  //     .catch(err => {
  //       console.log(err);
  //       setError(err.message);
  //     });
  //   setIsLoading(false);
  // }

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get('https://react-http-95fe3-default-rtdb.firebaseio.com/movies.json');
      const loadedMovies = [];
      for (const key in response.data) {
        loadedMovies.push({
          ...response.data[key],
          id: key
        });
      }
      // const transformedMovies = loadedMovies.map(movie => {
      //   return {
      //     id: movie.episode_id,
      //     title: movie.title,
      //     openingText: movie.opening_crawl,
      //     releaseDate: movie.release_date,
      //   };
      // });
      setMovies(loadedMovies);
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  async function addMovieHandler(movie) {
    console.log(movie);
    const response = await fetch('https://react-http-95fe3-default-rtdb.firebaseio.com/movies.json', {
      // What POST does depends on the backend, but typically creates a new resource
      method: 'POST',
      // body requires JSON data
      body: JSON.stringify(movie),
      headers: {
        // Describes the content of the body
        'Content-Type': 'application/json',
      }
    })
    const data = await response.json();
    console.log(data);
    // You can handle errors here as well
  }

  let content = <p>Found no movies.</p>;
  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }
  if (error) {
    content = <p>Error: {error}</p>;
  }
  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
