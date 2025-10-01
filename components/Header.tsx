
import React from 'react';

interface HeaderProps {
  category: string;
  onMenuClick: () => void;
}

const formatCategoryName = (name: string): string => {
  return name
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const MenuIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
);

export const Header: React.FC<HeaderProps> = ({ category, onMenuClick }) => {
  return (
    <header className="flex-shrink-0 border-b border-gray-200 bg-white">
      <div className="px-4 md:px-8 py-3 flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="md:hidden text-gray-500 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-md p-1"
          aria-label="Open sidebar"
        >
          <MenuIcon className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-semibold text-gray-700">{formatCategoryName(category)}</h1>
      </div>
    </header>
  );
};
