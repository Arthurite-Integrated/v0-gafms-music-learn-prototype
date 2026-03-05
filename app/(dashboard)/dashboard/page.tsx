'use client';

import { useAuth } from '@/lib/auth-context';
import { AdminDashboard, InstructorDashboard, StudentDashboard } from '@/components/dashboard/dashboard-views';

export default function DashboardPage() {
  const { user } = useAuth();

  if (!user) return null;

  if (user.role === 'admin') {
    return <AdminDashboard />;
  }

  if (user.role === 'instructor') {
    return <InstructorDashboard />;
  }

  return <StudentDashboard />;
}
