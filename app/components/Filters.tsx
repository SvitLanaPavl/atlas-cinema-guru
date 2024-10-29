'use client';
import { useState, useEffect } from 'react';

interface FiltersProps {
  onFiltersChange: (filters: {
    search: string;
    minYear: string;
    maxYear: string;
    genres: string[];
  }) => void;
}

const Filters: React.FC<FiltersProps> = ({ onFiltersChange }) => {
  const [search, setSearch] = useState('');
  const [minYear, setMinYear] = useState('');
  const [maxYear, setMaxYear] = useState('');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [allGenres, setAllGenres] = useState<string[]>([]);

  // Fetch genres on component mount
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch('/api/genres');
        const data = await response.json();
        setAllGenres(data.genres);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    fetchGenres();
  }, []);

  // Trigger filters change whenever any filter input changes
  useEffect(() => {
    onFiltersChange({
      search: search.trim(), // Use trimmed search string
      minYear: minYear.trim(), // Ensure no extra spaces
      maxYear: maxYear.trim(), // Ensure no extra spaces
      genres: selectedGenres,
    });
  }, [search, minYear, maxYear, selectedGenres]);

  // Handle genre selection
  const toggleGenre = (genre: string) => {
    setSelectedGenres((prevSelected) =>
      prevSelected.includes(genre)
        ? prevSelected.filter((g) => g !== genre)
        : [...prevSelected, genre]
    );
  };

  return (
    <div className="p-10 rounded-md shadow-md w-full h-auto">
      <div className="flex flex-col md:flex-row justify-between mb-6 gap-5">
        {/* Search and Year Filters */}
        <div className="flex flex-col space-y-4 relative">
          <h2 className="text-lg text-white font-semibold ms-3">Search</h2>

          <div className="relative w-full">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="p-2 border bg-navy border-teal rounded-full w-full text-white"
            />
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
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {allGenres.map((genre) => (
              <div
                key={genre}
                onClick={() => toggleGenre(genre)}
                className={`cursor-pointer border border-teal rounded-full px-4 py-2 text-center ${
                  selectedGenres.includes(genre) ? 'bg-teal text-blue' : 'bg-transparent text-white'
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
