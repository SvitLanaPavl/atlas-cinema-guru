'use client';
import MovieCard from './MovieCard';

interface Movie {
  id: string;
  title: string;
  synopsis: string;
  released: number;
  genre: string;
  image: string;
}

const MovieList = ({ movies }: { movies: Movie[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mx-5 md:mx-10">
      {movies.length > 0 ? (
        movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} /> // Pass movie data to MovieCard
        ))
      ) : (
        <p className='text-teal text-lg font-semibold px-3 py-5'>No movies found.</p>
      )}
    </div>
  );
};

export default MovieList;
