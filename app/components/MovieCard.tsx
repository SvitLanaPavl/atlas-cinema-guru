'use client';
import { useState, useEffect } from 'react';

interface Movie {
  id: string;
  title: string;
  synopsis: string;
  released: number;
  genre: string;
  favorited?: boolean;
  watchLater?: boolean;
}

interface MovieCardProps {
  movie: Movie;
  toggleFavorite?: (movieId: string) => void;
  toggleWatchLater?: (movieId: string) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, toggleFavorite, toggleWatchLater }) => {
  const [isFavorited, setIsFavorited] = useState(movie.favorited || false);
  const [isWatchLater, setIsWatchLater] = useState(movie.watchLater || false);
  const [isLoading, setIsLoading] = useState(false);

  const imageUrl = `/images/${movie.id}.webp`;

  useEffect(() => {
    setIsFavorited(movie.favorited || false);
    setIsWatchLater(movie.watchLater || false);
  }, [movie.favorited, movie.watchLater]);

  const handleFavoriteToggle = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      if (isFavorited) {
        await fetch(`/api/favorites/${movie.id}`, { method: 'DELETE' });
        setIsFavorited(false);
      } else {
        await fetch(`/api/favorites/${movie.id}`, { method: 'POST' });
        setIsFavorited(true);
      }
      if (toggleFavorite) toggleFavorite(movie.id);
    } catch (error) {
      console.error('Error updating favorites:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleWatchLaterToggle = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      if (isWatchLater) {
        await fetch(`/api/watch-later/${movie.id}`, { method: 'DELETE' });
        setIsWatchLater(false);
      } else {
        await fetch(`/api/watch-later/${movie.id}`, { method: 'POST' });
        setIsWatchLater(true);
      }
      if (toggleWatchLater) toggleWatchLater(movie.id);
    } catch (error) {
      console.error('Error updating watch later:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative group border-teal border-2 rounded-lg overflow-hidden h-[45vh]">
      <div
        className="h-full w-full bg-cover bg-no-repeat bg-center"
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>

      <div className="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
        <img
          src={isFavorited ? '/assets/star-solid.svg' : '/assets/star.svg'}
          alt="Favorite"
          className={`h-6 w-6 cursor-pointer ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handleFavoriteToggle}
        />
        <img
          src={isWatchLater ? '/assets/clock-solid.svg' : '/assets/clock.svg'}
          alt="Watch Later"
          className={`h-6 w-6 cursor-pointer ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handleWatchLaterToggle}
        />
      </div>

      <div className="absolute space-y-5 bottom-0 left-0 w-full h-0 opacity-0 group-hover:h-[40%] lg:group-hover:h-[47%] group-hover:opacity-100 transition-all duration-500 ease-in-out bg-navy bg-opacity-75 p-4">
        <h3 className="text-lg font-semibold text-white">
          {movie.title} ({movie.released})
        </h3>
        <p className="text-sm line-clamp-2 text-white">{movie.synopsis}</p>
        <div className="flex flex-wrap gap-2 mt-2">
          <span className="bg-teal text-blue px-2 py-1 rounded-full text-xs">
            {movie.genre}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
