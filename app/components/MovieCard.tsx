'use client';

interface Movie {
  id: string;
  title: string;
  synopsis: string;
  released: number;
  genre: string[];
  image: string;
}

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <div className="relative group border-teal border-2 rounded-lg overflow-hidden h-[45vh]">
      {/* Background image */}
      <div
        className="h-full w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${movie.image})` }}
      ></div>

      {/* Favorite and Watch Later Icons */}
      <div className="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
        <img
          src="/assets/star.svg"
          alt="Favorite"
          className="h-6 w-6 cursor-pointer"
        />
        <img
          src="/assets/clock.svg"
          alt="Watch Later"
          className="h-6 w-6 cursor-pointer"
        />
      </div>

      {/* Hover overlay */}
      <div className="absolute space-y-5 bottom-0 left-0 w-full h-0 opacity-0 group-hover:h-[40%] group-hover:opacity-100 transition-all duration-500 ease-in-out bg-navy bg-opacity-75 p-4">
        {/* Movie Title */}
        <h3 className="text-lg font-semibold text-white">
          {movie.title} ({movie.released})
        </h3>

        {/* Movie Description */}
        <p className="text-sm line-clamp-2 text-white">{movie.synopsis}</p>

        {/* Movie Genre */}
        <div className="flex flex-wrap gap-2 mt-2">
          {movie.genre.map((genre) => (
            <span
              key={genre}
              className="bg-teal text-blue px-2 py-1 rounded-full text-xs"
            >
              {genre}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
