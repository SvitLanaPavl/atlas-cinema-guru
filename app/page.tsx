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
  const [allMovies, setAllMovies] = useState<Movie[]>([]); // Store all movies fetched initially
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]); // Store filtered movies
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
        setAllMovies(data.titles); // Set all movies for initial load
        setFilteredMovies(data.titles); // Initially set filtered movies to all movies
        setTotalPages(Math.ceil(data.titles.length / itemsPerPage));
      } else {
        setAllMovies([]);
        setFilteredMovies([]);
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  useEffect(() => {
    fetchAllMovies(); // Fetch all movies on initial load
  }, []);

  // Handle client-side filtering
  const handleFiltersChange = (filters: { search: string; minYear: string; maxYear: string; genres: string[] }) => {
    let filtered = allMovies;

    // Apply search filter
    if (filters.search) {
      filtered = filtered.filter(movie =>
        movie.title.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Apply year filters
    if (filters.minYear) {
      filtered = filtered.filter(movie => movie.released >= parseInt(filters.minYear));
    }

    if (filters.maxYear) {
      filtered = filtered.filter(movie => movie.released <= parseInt(filters.maxYear));
    }

    // Apply genre filters
    if (filters.genres.length > 0) {
      filtered = filtered.filter(movie =>
        filters.genres.includes(movie.genre)
      );
    }

    setFilteredMovies(filtered); // Update filtered movies list
    setTotalPages(Math.ceil(filtered.length / itemsPerPage));
    setCurrentPage(1); // Reset to first page when filters change
  };

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <Filters onFiltersChange={handleFiltersChange} />

      {/* Display movies for the current page */}
      <MovieList movies={filteredMovies.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)} />

      {/* Pagination controls */}
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </>
  );
}
