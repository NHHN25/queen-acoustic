'use client';

import React from 'react';

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-gold-200 border-t-gold-600 rounded-full animate-spin"></div>
    </div>
  );
}
