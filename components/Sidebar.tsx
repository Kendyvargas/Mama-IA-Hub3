
import React from 'react';

interface SidebarProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const HeartIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
);

const CloseIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);


const formatCategoryName = (name: string): string => {
  return name
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const Sidebar: React.FC<SidebarProps> = ({ categories, selectedCategory, onSelectCategory, isOpen, onClose }) => {
  return (
    <>
      {/* Backdrop for mobile */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-30 z-20 transition-opacity md:hidden ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      ></div>
      
      <aside 
        className={`fixed top-0 left-0 h-full w-64 flex-shrink-0 bg-gray-50 border-r border-gray-200 p-4 flex flex-col z-30 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="Sidebar"
      >
        <div className="flex items-center justify-between gap-2 mb-8 px-2">
           <div className="flex items-center gap-2">
                <HeartIcon className="w-7 h-7 text-pink-400" />
                <h1 className="text-xl font-bold text-gray-800">Mamá AI Hub</h1>
           </div>
           <button 
                onClick={onClose} 
                className="md:hidden p-1 text-gray-500 rounded-full hover:bg-gray-200 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                aria-label="Close sidebar"
            >
                <CloseIcon className="h-6 w-6" />
           </button>
        </div>
        <nav className="flex-1 space-y-1">
            {categories.map(category => (
            <button
                key={category}
                onClick={() => onSelectCategory(category)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
                selectedCategory === category
                    ? 'bg-purple-100 text-purple-700'
                    : 'text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                }`}
            >
                {formatCategoryName(category)}
            </button>
            ))}
        </nav>
        <div className="mt-auto text-center text-xs text-gray-400">
            <p>Hecho con ❤️ para mamás</p>
        </div>
      </aside>
    </>
  );
};
