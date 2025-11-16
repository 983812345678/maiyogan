import React, { useState } from 'react';

interface LoginProps {
  onLogin: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would be a secure API call.
    // For this project, we use simple hardcoded credentials.
    if (username === 'pari' && password === '654321') {
      onLogin();
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 dark:bg-slate-900">
      <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-slate-800 rounded-2xl shadow-lg">
        <div className="text-center">
            <svg className="mx-auto h-12 w-auto text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.25a.75.75 0 0 1-.75-.75v-7.5a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 .75.75v7.5a.75.75 0 0 1-.75.75Zm-4.5 0h-3.75a.75.75 0 0 1-.75-.75V11.25a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 .75.75v8.25a.75.75 0 0 1-.75.75Z" />
                 <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 21h3.75a.75.75 0 0 0 .75-.75v-7.5a.75.75 0 0 0-.75-.75h-3.75a.75.75 0 0 0-.75.75v7.5a.75.75 0 0 0 .75.75Z" />
                 <path strokeLinecap="round" strokeLinejoin="round" d="M2.625 11.25a.75.75 0 0 1-.75-.75V3.375c0-.621.504-1.125 1.125-1.125h17.25c.621 0 1.125.504 1.125 1.125v7.125a.75.75 0 0 1-.75.75" />
                 <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25-3-3m0 0-3 3m3-3v7.5" />
            </svg>

          <h1 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Maiyogan Bakery
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Admin Inventory Login
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="relative block w-full appearance-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:placeholder-slate-400"
                placeholder="Username "
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="relative block w-full appearance-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:placeholder-slate-400"
                placeholder="Password "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && <p className="text-sm text-red-500 text-center">{error}</p>}

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
