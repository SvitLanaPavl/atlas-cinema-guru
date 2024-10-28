// Watch Later Page
'use client';

import { useState, useEffect } from 'react';
import MovieList from '../components/MovieList';

export default function WatchLaterPage() {
  const [movies, setMovies] = useState([]);

  const fetchWatchLater = async () => {
    const res = await fetch('/api/watch-later');
    const data = await res.json();
    setMovies(data.movies);
  };

  useEffect(() => {
    fetchWatchLater();
  }, []);

  return (
    <>
      <h1 className="text-white text-2xl">Watch Later</h1>
      <MovieList movies={movies} />
    </>
  );
}
