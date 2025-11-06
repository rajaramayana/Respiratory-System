
import React from 'react';

export const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center space-y-2">
    <div className="w-12 h-12 border-4 border-slate-300 border-t-sky-600 rounded-full animate-spin"></div>
    <p className="text-slate-500">Loading Module...</p>
  </div>
);
