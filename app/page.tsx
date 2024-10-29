'use client';

import Filters from './components/Filters';
import MovieList from './components/MovieList';
import Pagination from './components/Pagination';
import { useState } from 'react';

interface Movie {
  id: string;
  title: string;
  synopsis: string;
  released: number;
  genre: string[];
  image: string;
}

export default function Page() {
  // Static movie data
  const staticMovies: Movie[] = [
    {
      id: '1',
      title: 'Inception',
      synopsis: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea.',
      released: 2010,
      genre: ['Action', 'Sci-Fi'],
      image: '/images/0c0b6fba-ccba-49d5-8417-6fc945754a91.webp',
    },
    {
      id: '2',
      title: 'The Matrix',
      synopsis: 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
      released: 1999,
      genre: ['Action', 'Sci-Fi'],
      image: '/images/0f3b2880-b99d-4029-a4df-21c6efb5f80b.webp',
    },
    {
      id: '3',
      title: 'Interstellar',
      synopsis: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity’s survival.',
      released: 2014,
      genre: ['Adventure', 'Drama', 'Sci-Fi'],
      image: '/images/0fa9c729-42af-4b2c-9baa-ba0c571d6d58.webp',
    },
    // Add more movies if needed
    {
      id: '4',
      title: 'Inception',
      synopsis: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea.',
      released: 2010,
      genre: ['Action', 'Sci-Fi'],
      image: '/images/1b41f5a6-585c-4d27-8298-4cf092f1617a.webp',
    },
    {
      id: '5',
      title: 'The Matrix',
      synopsis: 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
      released: 1999,
      genre: ['Action', 'Sci-Fi'],
      image: '/images/1d5ef45e-3527-4240-ac1c-dcdb6265bda1.webp',
    },
    {
      id: '6',
      title: 'Interstellar',
      synopsis: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity’s survival.',
      released: 2014,
      genre: ['Adventure', 'Drama', 'Sci-Fi'],
      image: '/images/1f99f9c2-d28b-475f-9369-6fdc2dcc0c9e.webp',
    },
    {
      id: '7',
      title: 'Inception',
      synopsis: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea.',
      released: 2010,
      genre: ['Action', 'Sci-Fi'],
      image: '/images/2edc1022-e6a6-4eae-90b5-33ad7a027e49.webp',
    },
    {
      id: '8',
      title: 'The Matrix',
      synopsis: 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
      released: 1999,
      genre: ['Action', 'Sci-Fi'],
      image: '/images/2efd008a-4716-4356-87a8-a716562d2e9d.webp',
    },
    {
      id: '9',
      title: 'Interstellar',
      synopsis: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity’s survival.',
      released: 2014,
      genre: ['Adventure', 'Drama', 'Sci-Fi'],
      image: '/images/3e3eddc4-275f-401b-96ba-84444e6fd253.webp',
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // Max number of movies per page

  // Calculate the start and end indices for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Get the movies for the current page
  const displayedMovies = staticMovies.slice(startIndex, endIndex);

  // Calculate total pages
  const totalPages = Math.ceil(staticMovies.length / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <Filters setFilters={() => {}} /> {/* Static filters, no functionality */}
      <MovieList movies={staticMovies} /> {/* Pass static movie data */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
}
