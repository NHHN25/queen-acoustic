'use client';

import React from 'react';

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-gold-200 border-t-gold-600"></div>
    </div>
  );
}
