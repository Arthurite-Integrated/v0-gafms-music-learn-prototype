'use client';

import { useAuth } from '@/lib/auth-context';
import { redirect } from 'next/navigation';
import { MainNav } from '@/components/nav/main-nav';
import { Sidebar } from '@/components/nav/sidebar';
import { Footer } from '@/components/nav/footer';
import { useEffect, useState } from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (mounted && !isLoading && !user) {
    redirect('/login');
  }

  if (!mounted || isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 rounded-full border-2 border-accent border-t-transparent animate-spin mx-auto"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col md:flex-row">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div
        className={`fixed md:static inset-y-0 left-0 w-64 z-40 transform transition-transform duration-300 md:transform-none ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col w-full md:w-auto overflow-hidden">
        <MainNav onMenuClick={() => setSidebarOpen(!sidebarOpen)} menuOpen={sidebarOpen} />
        <main className="flex-1 overflow-auto bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
            {children}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
