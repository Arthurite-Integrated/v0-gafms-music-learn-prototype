'use client';

import { useAuth } from '@/lib/auth-context';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  BookOpen,
  Music,
  Users,
  BarChart3,
  Settings,
  FileText,
  LogOut,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import Image from 'next/image';

export function Sidebar({ onClose }: { onClose?: () => void }) {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  if (!user) return null;

  // Define navigation items based on role
  const adminNavItems = [
    { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/courses', icon: BookOpen, label: 'Courses' },
    { href: '/users', icon: Users, label: 'Users' },
    { href: '/students', icon: Users, label: 'Students' },
    { href: '/analytics', icon: BarChart3, label: 'Analytics' },
    { href: '/reports', icon: FileText, label: 'Reports' },
    { href: '/settings', icon: Settings, label: 'Settings' },
  ];

  const instructorNavItems = [
    { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/courses', icon: BookOpen, label: 'My Courses' },
    { href: '/practicals', icon: Music, label: 'Practicals' },
    { href: '/submissions', icon: FileText, label: 'Submissions' },
    { href: '/students', icon: Users, label: 'Students' },
    { href: '/grades', icon: BarChart3, label: 'Grades' },
    { href: '/analytics', icon: BarChart3, label: 'Analytics' },
  ];

  const studentNavItems = [
    { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/courses', icon: BookOpen, label: 'My Courses' },
    { href: '/practicals', icon: Music, label: 'Practicals' },
    { href: '/submissions', icon: FileText, label: 'My Submissions' },
    { href: '/grades', icon: BarChart3, label: 'My Grades' },
    { href: '/profile', icon: Settings, label: 'Profile' },
  ];

  const navItems =
    user.role === 'admin'
      ? adminNavItems
      : user.role === 'instructor'
        ? instructorNavItems
        : studentNavItems;

  const handleNavClick = () => {
    if (onClose) onClose();
  };

  return (
    <div className="w-full bg-card border-r border-border flex flex-col h-full">
      {/* Logo */}
      <div className="p-4 sm:p-6 border-b border-border">
        <Link href="/dashboard" className="flex items-center gap-2 sm:gap-3" onClick={handleNavClick}>
          <Image 
            src="/gafms-logo.png" 
            alt="GAFMS Logo" 
            width={48} 
            height={48}
            className="w-10 sm:w-12 h-10 sm:h-12"
          />
          <div className="min-w-0">
            <h1 className="font-bold text-xs sm:text-sm text-foreground leading-tight truncate">MusicLearn</h1>
            <p className="text-xs text-muted-foreground truncate">{user.role}</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-2 sm:p-4 space-y-1 sm:space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={handleNavClick}
              className={cn(
                'flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm sm:text-base',
                isActive
                  ? 'bg-accent/10 text-accent font-medium'
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground',
              )}
            >
              <Icon className="w-4 sm:w-5 h-4 sm:h-5 flex-shrink-0" />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Profile & Logout */}
      <div className="p-2 sm:p-4 border-t border-border space-y-2 sm:space-y-4">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-medium text-muted-foreground">Theme</span>
          <ThemeToggle />
        </div>
        <div className="px-2 sm:px-4 py-2 sm:py-3 rounded-lg bg-secondary/50">
          <p className="text-xs font-medium text-muted-foreground">Signed in as</p>
          <p className="text-xs sm:text-sm font-medium text-foreground truncate">{user.name}</p>
          <p className="text-xs text-muted-foreground truncate">{user.email}</p>
        </div>
        <Button
          onClick={() => {
            logout();
            if (onClose) onClose();
          }}
          variant="outline"
          className="w-full justify-start gap-2 border-border text-xs sm:text-sm"
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          <span className="truncate">Logout</span>
        </Button>
      </div>
    </div>
  );
}
