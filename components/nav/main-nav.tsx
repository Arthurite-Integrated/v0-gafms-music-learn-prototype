'use client';

import { useAuth } from '@/lib/auth-context';
import { Bell, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function MainNav({ onMenuClick, menuOpen }: { onMenuClick?: () => void; menuOpen?: boolean }) {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <header className="h-14 sm:h-16 border-b border-border bg-card backdrop-blur-sm sticky top-0 z-40">
      <div className="h-full px-3 sm:px-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 sm:gap-4 min-w-0">
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden flex-shrink-0"
            onClick={onMenuClick}
          >
            {menuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
          <div className="min-w-0">
            <h2 className="font-semibold text-foreground text-sm sm:text-base truncate">
              Welcome back, {user.name.split(' ')[0]}
            </h2>
            <p className="text-xs text-muted-foreground hidden sm:block">
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <Bell className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
