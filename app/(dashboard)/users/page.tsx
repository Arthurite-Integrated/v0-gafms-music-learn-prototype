'use client';

import { getAllDemoUsers } from '@/lib/auth';
import { useAuth } from '@/lib/auth-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Mail, Shield } from 'lucide-react';
import { notFound } from 'next/navigation';

export default function UsersPage() {
  const { user } = useAuth();

  if (!user || user.role !== 'admin') {
    notFound();
  }

  const allUsers = getAllDemoUsers();
  const usersByRole = allUsers.reduce(
    (acc, u) => {
      if (!acc[u.role]) {
        acc[u.role] = [];
      }
      acc[u.role].push(u);
      return acc;
    },
    {} as Record<string, typeof allUsers>,
  );

  const roleColors: Record<string, string> = {
    admin: 'bg-purple-500/20 text-purple-600 border-purple-500/30',
    instructor: 'bg-blue-500/20 text-blue-600 border-blue-500/30',
    student: 'bg-accent/20 text-accent border-accent/30',
  };

  const roleIcons: Record<string, React.ReactNode> = {
    admin: <Shield className="w-4 h-4" />,
    instructor: <Users className="w-4 h-4" />,
    student: <Users className="w-4 h-4" />,
  };

  return (
    <div className="space-y-6 py-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">User Management</h1>
        <p className="text-muted-foreground">
          Manage all system users and permissions
        </p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{allUsers.length}</div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Admins</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {usersByRole.admin?.length || 0}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Instructors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {usersByRole.instructor?.length || 0}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {usersByRole.student?.length || 0}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Users by Role */}
      <div className="space-y-6">
        {Object.entries(usersByRole).map(([role, users]) => (
          <Card key={role} className="border-border/50">
            <CardHeader>
              <CardTitle className="text-lg">
                {role.charAt(0).toUpperCase() + role.slice(1)}s
              </CardTitle>
              <CardDescription>
                {users.length} user{users.length !== 1 ? 's' : ''}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {users.map((u) => (
                  <div
                    key={u.id}
                    className="flex items-center justify-between p-4 rounded-lg border border-border/30 hover:bg-secondary/30 transition-colors"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-10 h-10 rounded-full bg-secondary/50 border border-border/30 flex items-center justify-center">
                        {roleIcons[role]}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-medium text-foreground">
                          {u.name}
                        </h4>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                          <Mail className="w-3 h-3" />
                          <span className="truncate">{u.email}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 ml-4 flex-shrink-0">
                      <Badge className={`${roleColors[role]}`}>
                        {u.status}
                      </Badge>
                      <Badge className="bg-secondary/50 text-foreground border-border/30">
                        {u.id}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
