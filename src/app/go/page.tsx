// src/app/go/page.tsx
import { Suspense } from 'react';
import Redirector from './components/Redirector';

export default function GoPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen bg-gray-900"><div className="flex flex-col items-center"><div className="h-10 w-10 rounded-full border-4 border-gray-700 border-t-accent animate-spin"></div><div className="mt-4 text-gray-300">Loading...</div></div></div>}>
      <Redirector />
    </Suspense>
  );
}
