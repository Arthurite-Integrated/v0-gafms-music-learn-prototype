'use client';

import { useAuth } from '@/lib/auth-context';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        router.push('/dashboard');
      } else {
        router.push('/login');
      }
    }
  }, [user, isLoading, router]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-12 h-12 rounded-full border-2 border-accent border-t-transparent animate-spin mx-auto"></div>
        <p className="text-muted-foreground">Loading GAFMS MusicLearn...</p>
      </div>
    </div>
  );
}
