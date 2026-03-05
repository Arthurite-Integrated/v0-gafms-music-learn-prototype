'use client';

import { usePathname } from 'next/navigation';
import Image from 'next/image';

export function Footer() {
  const pathname = usePathname();

  // Don't show footer on login page
  if (pathname === '/login') return null;

  return (
    <footer className="border-t border-border bg-card mt-auto">
      <div className="max-w-full mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-sm font-semibold text-foreground">GAFMS MusicLearn</h2>
            <p className="text-xs text-muted-foreground">Ghana Armed Forces Music School Learning Management System</p>
          </div>
          <div className="text-xs text-muted-foreground text-center sm:text-right">
            <p className="flex items-center gap-2 justify-center sm:justify-end">
              Built by 
              <a href="https://arthuriteintegrated.com/" target="_blank" rel="noopener noreferrer" className="font-semibold text-accent flex items-center gap-1.5 hover:underline">
                <Image src="/atr-logo.png" alt="Arthurite" width={16} height={16} className="w-4 h-4" />
                Arthurite Integrated
              </a>
            </p>
            <p className="mt-1">&copy; {new Date().getFullYear()} Ghana Armed Forces. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
