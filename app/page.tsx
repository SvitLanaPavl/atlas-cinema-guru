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
  const [movies, setMovies] = useState<Movie[]>([]); // Store all fetched movies
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const itemsPerPage = 9; // Display 9 movies per page

  // Fetch all movies from the API on component mount
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('/api/titles');
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        const data = await response.json();
        setMovies(data.titles); // Store all movies in the state
      } catch (error) {
        console.error('Error fetching movies: ', error);
      }
    };
    fetchMovies();
  }, []);

  // Calculate the total number of pages
  const totalPages = Math.ceil(movies.length / itemsPerPage);

  // Get the movies to be displayed on the current page
  const displayedMovies = movies.slice(
    (currentPage - 1) * itemsPerPage, 
    currentPage * itemsPerPage
  );

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <Filters setFilters={() => {}} />
      
      {/* Pass only the movies for the current page */}
      <MovieList movies={displayedMovies} />

      {/* Pagination controls */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
}
