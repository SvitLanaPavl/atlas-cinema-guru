'use client';

import { useState } from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }: { currentPage: number, totalPages: number, onPageChange: (page: number) => void }) => {
  // Check if "Previous" or "Next" buttons should be disabled
  const isPreviousDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPages;

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex items-center justify-center gap-2 my-5 py-5">
      {/* Previous Button */}
      <button
        onClick={handlePrevious}
        disabled={isPreviousDisabled}
        className={`px-5 py-3 w-28 text-blue bg-teal transition-opacity duration-300 rounded-l-full 
        ${isPreviousDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'}`}
      >
        Previous
      </button>

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={isNextDisabled}
        className={`px-5 py-3 w-28 text-blue bg-teal transition-opacity duration-300 rounded-r-full 
        ${isNextDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'}`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
