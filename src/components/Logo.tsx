import React from 'react';
import { BookOpen } from 'lucide-react';

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <BookOpen className="h-8 w-8 text-purple-600" />
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-400 rounded-full animate-pulse" />
      </div>
      <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
        MMCOE Store
      </span>
    </div>
  );
}