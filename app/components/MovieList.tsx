'use client';
import MovieCard from './MovieCard';

interface Movie {
  id: string;
  title: string;
  synopsis: string;
  released: number;
  genre: string[];
  image: string;
}

const MovieList = ({ movies }: { movies: Movie[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mx-5 md:mx-10">
      {movies.length > 0 ? (
        movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} /> // Pass movie data to MovieCard
        ))
      ) : (
        <p>No movies found.</p>
      )}
    </div>
  );
};

export default MovieList;
