
import React from 'react';

interface SuggestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  suggestion: string;
  isLoading: boolean;
}

export const SuggestionModal: React.FC<SuggestionModalProps> = ({ isOpen, onClose, suggestion, isLoading }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center" onClick={onClose}>
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8 max-w-lg w-full m-4 relative transform transition-all" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="flex items-center space-x-4 mb-4">
           <div className="p-3 rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" /></svg>
           </div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Today's Special Suggestion</h2>
        </div>
        
        <div className="mt-4 text-slate-600 dark:text-slate-300 min-h-[100px]">
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <div className="animate-pulse space-y-3 w-full">
                <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded"></div>
                <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-5/6"></div>
                <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
              </div>
            </div>
          ) : (
            <p className="whitespace-pre-wrap">{suggestion}</p>
          )}
        </div>
        
        <div className="mt-6 text-right">
          <button onClick={onClose} className="bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
