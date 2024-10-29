'use client';

import { useState, useEffect } from 'react';
import MovieList from '../components/MovieList';
import Pagination from '../components/Pagination';

interface Movie {
  id: string;
  title: string;
  synopsis: string;
  released: number;
  genre: string;
  favorited?: boolean;
}

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 9;

  // Fetch user's favorite movies
  const fetchFavorites = async (page: number) => {
    try {
      const response = await fetch(`/api/favorites?page=${page}`);
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      const data = await response.json();

      if (data.favorites) {
        setFavorites(data.favorites);
        setTotalPages(Math.ceil(data.favorites.length / itemsPerPage));
      } else {
        setFavorites([]); // Clear movies if nothing is returned
      }
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };

  useEffect(() => {
    fetchFavorites(currentPage); // Fetch favorites when the page changes
  }, [currentPage]);

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  // Toggle the favorite status for a specific movie
const toggleFavorite = (movieId: string) => {
  setFavorites((prevFavorites) =>
    prevFavorites.filter((movie) => movie.id !== movieId) // Remove the movie from the list on unlike
  );
};

  return (
    <>
      <h1 className="text-4xl md:text-5xl font-bold text-center text-white mb-8 py-10 mt-5">Favorites</h1>

      {/* Display favorite movies for the current page */}
      <MovieList
        movies={favorites.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)}
        toggleFavorite={toggleFavorite}  // Pass the toggleFavorite function
      />

      {/* Pagination controls */}
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </>
  );
}
