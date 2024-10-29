'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import ActivityFeed from './ActivityFeed';

const DashboardSidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect if the screen is mobile or not
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Set to true if the screen width is smaller than 768px (md breakpoint)
    };

    handleResize(); // Check the initial width
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      className={`relative bg-teal transition-all ease-in-out duration-300 ${
        isExpanded ? 'md:w-64' : 'md:w-20'
      } w-full h-20 md:h-auto lg:h-auto`}
      // Only enable expand/collapse hover behavior for medium and large screens
      onMouseEnter={() => !isMobile && setIsExpanded(true)}
      onMouseLeave={() => !isMobile && setIsExpanded(false)}
    >
      <div
        className={`flex flex-row md:flex-col py-0 md:py-10 md:space-y-6 px-5 h-full`}
      >
        {/* Home Link */}
        <Link href="/" className="flex items-center w-full ">
          <img src="/assets/folder-solid.svg" alt="Home" className="h-6 w-6" />
          {(isExpanded || isMobile) && <span className="ml-3 text-white hover:text-blueLight transition ease-in-out duration-300 hover:scale-105">Home</span>}
        </Link>

        {/* Favorites Link */}
        <Link href="/favorites" className="flex items-center w-full">
          <img src="/assets/star-solid.svg" alt="Favorites" className="h-6 w-6" />
          {(isExpanded || isMobile) && <span className="ml-3 text-white hover:text-blueLight transition ease-in-out duration-300 hover:scale-105">Favorites</span>}
        </Link>

        {/* Watch Later Link */}
        <Link href="/watch-later" className="flex items-center w-full">
          <img src="/assets/clock-solid.svg" alt="Watch Later" className="h-6 w-6" />
          {(isExpanded || isMobile) && <span className="ml-3 text-white hover:text-blueLight transition ease-in-out duration-300 hover:scale-105">Watch Later</span>}
        </Link>
        {/* Activity Feed */}
        {isExpanded && <ActivityFeed />}
      </div>
      
    </div>
  );
};

export default DashboardSidebar;
