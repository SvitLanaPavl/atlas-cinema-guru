// Favorites Page
'use client';

import { useState, useEffect } from 'react';
import MoviesList from '../components/MovieList';

export default function FavoritesPage() {
  const [movies, setMovies] = useState([]);

  const fetchFavorites = async () => {
    const res = await fetch('/api/favorites');
    const data = await res.json();
    setMovies(data.movies); // Assuming the API response contains 'movies'
  };

  useEffect(() => {
    fetchFavorites(); // Fetch favorite movies on component mount
  }, []);

  return (
    <>
      <h1 className="text-white text-2xl">Favorites</h1>
      <MoviesList movies={movies} />
    </>
  );
}
