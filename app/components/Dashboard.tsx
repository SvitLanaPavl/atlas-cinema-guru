'use client';
import Link from 'next/link';
import { useState } from 'react';

const DashboardSidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`relative top-0 left-0 h-screen bg-teal transition-all ease-in duration-300 ${
        isExpanded ? 'w-60' : 'w-20'
      }`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className={`flex py-10 flex-col transition-all ease-in duration-300 ${
        isExpanded ? 'items-start px-5' : 'items-center'
      }  py-4 space-y-6`}>
        {/* Home Link */}
        <Link href="/" className="flex items-center space-x-3">
            <img src="/assets/folder-solid.svg" alt="Home" className="h-6 w-6" />
            {isExpanded && <span className="text-white">Home</span>}
        </Link>

        {/* Favorites Link */}
        <Link href="/favorites" className="flex items-center space-x-2">
            <img src="/assets/star-solid.svg" alt="Favorites" className="h-6 w-6" />
            {isExpanded && <span className="text-white">Favorites</span>}
        </Link>

        {/* Watch Later Link */}
        <Link href="/watch-later" className="flex items-center space-x-2">
            <img src="/assets/clock-solid.svg" alt="Watch Later" className="h-6 w-6" />
            {isExpanded && <span className="text-white">Watch Later</span>}
        </Link>
      </div>
    </div>
  );
};

export default DashboardSidebar;
