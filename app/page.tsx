'use client';

import { useState, useEffect } from 'react';
import Filters from './components/Filters';
import MovieList from './components/MovieList';
import Pagination from './components/Pagination';

interface Movie {
  id: string;
  title: string;
  synopsis: string;
  released: number;
  genre: string;
  image: string;
}

export default function Page() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 9;

  // Fetch all movies on initial load
  const fetchAllMovies = async () => {
    try {
      const response = await fetch(`/api/titles`); // Fetch all movies on initial load
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      const data = await response.json();

      if (data.titles) {
        setMovies(data.titles);
        setTotalPages(Math.ceil(data.titles.length / itemsPerPage));
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  useEffect(() => {
    fetchAllMovies(); // Fetch all movies on initial load
  }, []);

  // Handle filters change
  const handleFiltersChange = async (filters: { search: string; minYear: string; maxYear: string; genres: string[] }) => {
    try {
      // Check if any filters are active
      const noFiltersApplied =
        !filters.search && filters.minYear === '' && filters.maxYear === '' && filters.genres.length === 0;

      // If no filters are applied, fetch all movies (just like the initial load)
      if (noFiltersApplied) {
        fetchAllMovies(); // Revert to fetching all movies
        return;
      }

      // Construct query string when filters are applied
      const queryParams = new URLSearchParams({
        query: filters.search || '', // Handle search
        minYear: filters.minYear || '', // Only add to query if filled
        maxYear: filters.maxYear || '', // Only add to query if filled
        genres: filters.genres.length > 0 ? filters.genres.join(',') : '', // Handle genres
      });

      const response = await fetch(`/api/titles?${queryParams.toString()}`); // Fetch movies based on filters
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      setMovies(data.titles); // Update the movie list based on filters
      setTotalPages(Math.ceil(data.titles.length / itemsPerPage));
    } catch (error) {
      console.error('Error fetching filtered movies:', error);
    }
  };

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <Filters onFiltersChange={handleFiltersChange} />

      {/* Display movies for the current page */}
      <MovieList movies={movies.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)} />

      {/* Pagination controls */}
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </>
  );
}
