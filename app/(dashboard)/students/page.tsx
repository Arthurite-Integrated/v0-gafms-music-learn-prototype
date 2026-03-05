'use client';

import { getAllDemoUsers, getUsersByRole } from '@/lib/auth';
import { useAuth } from '@/lib/auth-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Users, Mail } from 'lucide-react';
import { notFound } from 'next/navigation';

export default function StudentsPage() {
  const { user } = useAuth();

  if (!user || (user.role !== 'admin' && user.role !== 'instructor')) {
    notFound();
  }

  const students = getUsersByRole('student');

  return (
    <div className="space-y-6 py-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Students</h1>
        <p className="text-muted-foreground">
          {user.role === 'admin'
            ? 'All system students'
            : 'Students in your courses'}
        </p>
      </div>

      {/* Stats */}
      <Card className="border-border/50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle>Total Students</CardTitle>
          <Users className="h-5 w-5 text-accent" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{students.length}</div>
        </CardContent>
      </Card>

      {/* Students Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {students.map((student) => (
          <Link
            key={student.id}
            href={`/students/${student.id}`}
          >
            <Card className="border-border/50 hover:border-accent/50 transition-all hover:shadow-lg h-full cursor-pointer">
              <CardHeader>
                <CardTitle className="line-clamp-1">{student.name}</CardTitle>
                <CardDescription className="text-xs">
                  {student.id}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground truncate">
                    {student.email}
                  </p>
                </div>

                {student.enrolledCourses && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">
                      Enrolled Courses
                    </p>
                    <p className="font-semibold text-foreground">
                      {student.enrolledCourses.length}
                    </p>
                  </div>
                )}

                <div className="flex justify-between items-center pt-4 border-t border-border/30">
                  <Badge className="bg-accent/20 text-accent border-accent/30">
                    {student.status}
                  </Badge>
                  <span className="text-xs text-muted-foreground">View</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {students.length === 0 && (
        <Card className="border-border/50">
          <CardContent className="py-12 text-center">
            <Users className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
            <h3 className="font-semibold text-foreground mb-2">
              No Students
            </h3>
            <p className="text-muted-foreground">
              No students found in the system.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
