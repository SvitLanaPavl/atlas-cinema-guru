'use client';

import Filters from './components/Filters';
import MovieList from './components/MovieList';

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
  ];

  return (
    <>
      <Filters setFilters={() => {}} /> {/* Static filters, no functionality */}
      <MovieList movies={staticMovies} /> {/* Pass static movie data */}
    </>
  );
}
