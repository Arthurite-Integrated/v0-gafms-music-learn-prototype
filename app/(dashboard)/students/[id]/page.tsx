'use client';

import React from 'react';
import { getUserById } from '@/lib/auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';
import { ChevronLeft, Mail, BookOpen, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { notFound } from 'next/navigation';

export default function StudentProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);
  const student = getUserById(id);

  if (!student || student.role !== 'student') {
    notFound();
  }

  // Mock performance data
  const mockPerformance = {
    averageScore: 84,
    submissionsCount: 6,
    gradedCount: 4,
    completionRate: 60,
    courses: [
      { name: 'Trumpet Fundamentals', status: 'In Progress', average: 85 },
      { name: 'Music Theory I', status: 'In Progress', average: 82 },
    ],
  };

  return (
    <div className="space-y-6 py-6">
      {/* Header */}
      <div className="flex items-start gap-4">
        <Link href="/students">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <ChevronLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-foreground">{student.name}</h1>
          <p className="text-muted-foreground mt-1">{student.email}</p>
        </div>
        <Badge className="bg-accent/20 text-accent border-accent/30 shrink-0">
          {student.status}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Performance Overview */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Performance Overview</CardTitle>
              <CardDescription>
                Current semester statistics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Average Score</p>
                  <div className="text-3xl font-bold text-accent">
                    {mockPerformance.averageScore}%
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Submissions
                  </p>
                  <div className="text-3xl font-bold">
                    {mockPerformance.submissionsCount}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Graded</p>
                  <div className="text-3xl font-bold">
                    {mockPerformance.gradedCount}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Completion
                  </p>
                  <div className="text-3xl font-bold">
                    {mockPerformance.completionRate}%
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enrolled Courses */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Enrolled Courses</CardTitle>
              <CardDescription>
                {student.enrolledCourses?.length || 0} course
                {student.enrolledCourses?.length !== 1 ? 's' : ''}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockPerformance.courses.map((course, idx) => (
                <div key={idx} className="space-y-2 pb-4 border-b border-border/30 last:border-0 last:pb-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-foreground">
                        {course.name}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {course.status}
                      </p>
                    </div>
                    <Badge className="bg-accent/20 text-accent border-accent/30">
                      {course.average}%
                    </Badge>
                  </div>
                  <Progress value={course.average} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest submissions and grades</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg border border-border/30">
                  <div>
                    <p className="font-medium text-foreground text-sm">
                      Solo Performance
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Submitted 3 days ago
                    </p>
                  </div>
                  <Badge className="bg-accent/20 text-accent border-accent/30">
                    88%
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg border border-border/30">
                  <div>
                    <p className="font-medium text-foreground text-sm">
                      Major Scales
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Submitted 1 week ago
                    </p>
                  </div>
                  <Badge className="bg-accent/20 text-accent border-accent/30">
                    90%
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Info Card */}
          <Card className="border-border/50 sticky top-4">
            <CardHeader>
              <CardTitle className="text-base">Student Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">User ID</p>
                <p className="font-mono text-sm text-muted-foreground">
                  {student.id}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Email</p>
                <div className="flex items-center gap-1">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <p className="text-sm text-foreground break-all">
                    {student.email}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Status</p>
                <Badge className="bg-accent/20 text-accent border-accent/30">
                  {student.status}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-base">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-semibold text-foreground">
                    {mockPerformance.completionRate}%
                  </span>
                </div>
                <Progress
                  value={mockPerformance.completionRate}
                  className="h-2"
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Avg Grade</span>
                  <span className="font-semibold text-accent">
                    {mockPerformance.averageScore}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
