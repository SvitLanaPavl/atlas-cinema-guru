'use client';
import { useState, useEffect } from "react";

interface Movie {
  id: string;
  title: string;
  synopsis: string;
  released: number;
  genre: string;
  favorited?: boolean;
}

interface MovieCardProps {
  movie: Movie;
  toggleFavorite?: (movieId: string, isFavorited: boolean) => void; // Pass the favorited status
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, toggleFavorite }) => {
  const [isFavorited, setIsFavorited] = useState(movie.favorited || false); // Local state for favorited status
  const [isLoading, setIsLoading] = useState(false); // Loading state to prevent multiple clicks
  const imageUrl = `/images/${movie.id}.webp`;

  useEffect(() => {
    // Sync the local state with the updated movie prop
    setIsFavorited(movie.favorited || false);
  }, [movie.favorited]);

  const handleFavoriteToggle = async () => {
    if (isLoading) return; // Prevent additional clicks while waiting for the API response

    setIsLoading(true); // Set loading state to true while the request is being processed

    try {
      let response;

      if (isFavorited) {
        // Remove from favorites
        response = await fetch(`/api/favorites/${movie.id}`, { method: 'DELETE' });
        if (!response.ok) {
          throw new Error('Failed to remove favorite');
        }
        setIsFavorited(false); // Update the UI after the movie is removed from the database
      } else {
        // Add to favorites
        response = await fetch(`/api/favorites/${movie.id}`, { method: 'POST' });
        if (!response.ok) {
          throw new Error('Failed to add favorite');
        }
        setIsFavorited(true); // Update the UI after the movie is added to the database
      }

      // Call the parent toggleFavorite function (if provided) to update the parent state
      if (toggleFavorite) {
        toggleFavorite(movie.id, !isFavorited); // Pass the updated state to the parent
      }
    } catch (error) {
      console.error('Error updating favorites:', error);
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <div className="relative group border-teal border-2 rounded-lg overflow-hidden h-[45vh]">
      {/* Background image */}
      <div
        className="h-full w-full bg-cover bg-no-repeat bg-center"
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>

      {/* Favorite and Watch Later Icons */}
      <div className="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
        <img
          src={isFavorited ? '/assets/star-solid.svg' : '/assets/star.svg'}
          alt="Favorite"
          className={`h-6 w-6 cursor-pointer ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handleFavoriteToggle}
        />
        <img
          src="/assets/clock.svg"
          alt="Watch Later"
          className="h-6 w-6 cursor-pointer"
        />
      </div>

      {/* Hover overlay */}
      <div className="absolute space-y-5 bottom-0 left-0 w-full h-0 opacity-0 group-hover:h-[40%] lg:group-hover:h-[47%] xl:group-hover:h-[40%] group-hover:opacity-100 transition-all duration-500 ease-in-out bg-navy bg-opacity-75 p-4">
        {/* Movie Title */}
        <h3 className="text-lg font-semibold text-white">
          {movie.title} ({movie.released})
        </h3>

        {/* Movie Description */}
        <p className="text-sm line-clamp-2 text-white">{movie.synopsis}</p>

        {/* Movie Genre */}
        <div className="flex flex-wrap gap-2 mt-2">
          <span
            key={movie.genre}
            className="bg-teal text-blue px-2 py-1 rounded-full text-xs"
          >
            {movie.genre}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
