
import React from 'react';
import { SearchIcon } from './icons';

interface HeaderProps {
  moduleTitle: string;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ moduleTitle, searchTerm, onSearchChange }) => {
  return (
    <header className="no-print flex-shrink-0 bg-white dark:bg-slate-800/50 backdrop-blur-sm shadow-sm p-4 flex items-center justify-between z-10 border-b border-slate-200 dark:border-slate-700">
      <h2 className="text-xl font-bold text-slate-800 dark:text-white hidden sm:block truncate pr-4">
        {moduleTitle}
      </h2>
      <div className="relative w-full sm:max-w-xs">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon className="h-5 w-5 text-slate-400" />
        </div>
        <input
          type="text"
          placeholder="Ask about a topic..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="block w-full bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md py-2 pl-10 pr-3 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
        />
      </div>
    </header>
  );
};
