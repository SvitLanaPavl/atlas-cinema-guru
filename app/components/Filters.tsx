'use client';
import { useState } from 'react';

interface FiltersProps {
  setFilters: React.Dispatch<React.SetStateAction<{
    search: string;
    minYear: string;
    maxYear: string;
    genres: string[];
  }>>;
}

const Filters: React.FC<FiltersProps> = ({ setFilters }) => {
  // State for search input and year inputs
  const [search, setSearch] = useState('');
  const [minYear, setMinYear] = useState('');
  const [maxYear, setMaxYear] = useState('');

  // State for selected genres
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  // List of genres
  const genres = [
    'Romance', 'Horror', 'Drama', 'Action', 'Mystery', 
    'Fantasy', 'Thriller', 'Western', 'Sci-Fi', 'Adventure'
  ];

  // Function to handle genre selection
  const toggleGenre = (genre: string) => {
    setSelectedGenres((prevSelected) =>
      prevSelected.includes(genre)
        ? prevSelected.filter((g) => g !== genre)
        : [...prevSelected, genre]
    );
  };

  const updateFilters = () => {
    setFilters({
      search,
      minYear,
      maxYear,
      genres: selectedGenres,
    });
  };

  // Function to clear the search input
  const clearSearch = () => setSearch('');

  return (
    <div className="p-10 rounded-md shadow-md w-full h-auto">
      <div className="flex flex-col md:flex-row justify-between mb-6 gap-5">
        {/* Search and Year Filters */}
        <div className="flex flex-col space-y-4 relative">
          <h2 className="text-lg text-white font-semibold ms-3">Search</h2>

          {/* Search Input with Clear Icon */}
          <div className="relative w-full">
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value),
                updateFilters();
              }}
              placeholder="Search..."
              className="p-2 border bg-navy border-teal rounded-full w-full text-white"
            />
            {search && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white"
              >
                ✕
              </button>
            )}
          </div>

          <div className="flex space-x-4">
            {/* Min Year */}
            <div>
              <h3 className="text-md font-semibold text-white mb-4 ms-3">Min Year</h3>
              <input
                type="number"
                value={minYear}
                onChange={(e) => setMinYear(e.target.value)}
                placeholder="Min Year"
                className="p-2 border bg-navy border-teal rounded-full w-full text-white"
              />
            </div>

            {/* Max Year */}
            <div>
              <h3 className="text-md font-semibold text-white mb-4 ms-3">Max Year</h3>
              <input
                type="number"
                value={maxYear}
                onChange={(e) => setMaxYear(e.target.value)}
                placeholder="Max Year"
                className="p-2 border bg-navy border-teal rounded-full w-full text-white custom-year-input"
              />
            </div>
          </div>
        </div>

        {/* Genres */}
        <div className="flex flex-col">
          <h2 className="text-lg text-white ms-3 font-semibold mb-4">Genres</h2>
          <div className="grid grid-cols-3 lg:grid-cols-5 gap-4">
            {genres.map((genre) => (
              <div
                key={genre}
                onClick={() => toggleGenre(genre)}
                className={`cursor-pointer border border-teal rounded-full px-4 py-2 text-center ${
                  selectedGenres.includes(genre)
                    ? 'bg-teal text-blue'
                    : 'bg-transparent text-white'
                }`}
              >
                {genre}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
