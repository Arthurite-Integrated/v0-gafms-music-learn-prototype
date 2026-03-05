'use client';

import { useAuth } from '@/lib/auth-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mail, User, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  if (!user) return null;

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const roleColors: Record<string, string> = {
    admin: 'bg-purple-500/20 text-purple-600 border-purple-500/30',
    instructor: 'bg-blue-500/20 text-blue-600 border-blue-500/30',
    student: 'bg-accent/20 text-accent border-accent/30',
  };

  return (
    <div className="space-y-6 py-6 max-w-2xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-foreground">My Profile</h1>
        <p className="text-muted-foreground">Manage your account and settings</p>
      </div>

      {/* Profile Card */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Avatar */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-accent/10 border-2 border-accent flex items-center justify-center">
              <User className="w-8 h-8 text-accent" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">{user.name}</h2>
              <Badge className={`mt-2 ${roleColors[user.role]}`}>
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </Badge>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-4 pt-4 border-t border-border/30">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Email Address</p>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <p className="font-medium text-foreground">{user.email}</p>
              </div>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-1">User ID</p>
              <p className="font-mono text-sm text-muted-foreground">
                {user.id}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-1">Status</p>
              <Badge className="bg-accent/20 text-accent border-accent/30">
                {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enrollments */}
      {user.enrolledCourses && user.enrolledCourses.length > 0 && (
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Enrolled Courses</CardTitle>
            <CardDescription>
              {user.enrolledCourses.length} course
              {user.enrolledCourses.length !== 1 ? 's' : ''}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              View your enrolled courses on the Courses page
            </p>
          </CardContent>
        </Card>
      )}

      {/* Teaching Courses */}
      {user.taughtCourses && user.taughtCourses.length > 0 && (
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Teaching Courses</CardTitle>
            <CardDescription>
              {user.taughtCourses.length} course
              {user.taughtCourses.length !== 1 ? 's' : ''}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              Manage your courses on the Courses page
            </p>
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Account Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button
            onClick={handleLogout}
            className="w-full gap-2 bg-accent hover:bg-accent/90"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
