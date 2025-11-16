
import React from 'react';

interface HeaderProps {
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  return (
    <header className="bg-white dark:bg-slate-800 shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center space-x-2">
            <svg className="h-8 w-auto text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.25a.75.75 0 0 1-.75-.75v-7.5a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 .75.75v7.5a.75.75 0 0 1-.75.75Zm-4.5 0h-3.75a.75.75 0 0 1-.75-.75V11.25a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 .75.75v8.25a.75.75 0 0 1-.75.75Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 21h3.75a.75.75 0 0 0 .75-.75v-7.5a.75.75 0 0 0-.75-.75h-3.75a.75.75 0 0 0-.75.75v7.5a.75.75 0 0 0 .75.75Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.625 11.25a.75.75 0 0 1-.75-.75V3.375c0-.621.504-1.125 1.125-1.125h17.25c.621 0 1.125.504 1.125 1.125v7.125a.75.75 0 0 1-.75.75" />
                <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25-3-3m0 0-3 3m3-3v7.5" />
            </svg>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Maiyogan Bakery</h1>
        </div>
        <button
          onClick={onLogout}
          className="flex items-center space-x-2 rounded-md bg-red-500 py-2 px-4 text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
          </svg>
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
};
