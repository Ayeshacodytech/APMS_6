import React from 'react';
import { BookOpen } from 'lucide-react';

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      <div className="relative">
        <BookOpen className="w-12 h-12 text-blue-600" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-6 h-6 border-t-2 border-r-2 border-blue-600 rounded-full animate-spin"></div>
        </div>
      </div>
      
      <div className="text-center">
        <p className="text-lg font-medium text-gray-800">Loading</p>
      </div>
      
      <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full bg-blue-600 rounded-full animate-pulse" style={{width: '70%'}}></div>
      </div>
    </div>
  );
};

export default Loading;
