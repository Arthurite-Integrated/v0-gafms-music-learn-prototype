'use client';

import { useAuth } from '@/lib/auth-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3, Users, BookOpen, FileText } from 'lucide-react';
import Link from 'next/link';

export function AdminDashboard() {
  return (
    <div className="space-y-4 sm:space-y-6 py-4 sm:py-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">System Overview</h1>
        <p className="text-sm sm:text-base text-muted-foreground">Manage all courses, users, and system settings</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card className="border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Total Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-accent flex-shrink-0" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Active courses</p>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-accent flex-shrink-0" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">3 Instructors, 5 Students, 1 Admin</p>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Submissions</CardTitle>
            <FileText className="h-4 w-4 text-accent flex-shrink-0" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">4 Pending grade</p>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Avg Score</CardTitle>
            <BarChart3 className="h-4 w-4 text-accent flex-shrink-0" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">84%</div>
            <p className="text-xs text-muted-foreground">System-wide average</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Quick Actions</CardTitle>
          <CardDescription className="text-xs sm:text-sm">Manage your system</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <Link href="/courses/create" className="block">
              <Button className="w-full bg-accent hover:bg-accent/90 text-sm">
                Create Course
              </Button>
            </Link>
            <Link href="/users" className="block">
              <Button variant="outline" className="w-full border-border text-sm">
                Manage Users
              </Button>
            </Link>
            <Link href="/analytics" className="block">
              <Button variant="outline" className="w-full border-border text-sm">
                View Analytics
              </Button>
            </Link>
            <Link href="/reports" className="block">
              <Button variant="outline" className="w-full border-border text-sm">
                Generate Reports
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function InstructorDashboard() {
  return (
    <div className="space-y-4 sm:space-y-6 py-4 sm:py-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Teaching Dashboard</h1>
        <p className="text-sm sm:text-base text-muted-foreground">Manage your courses and student submissions</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card className="border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">My Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-accent flex-shrink-0" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Teaching this semester</p>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">My Students</CardTitle>
            <Users className="h-4 w-4 text-accent flex-shrink-0" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Across all courses</p>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Pending Reviews</CardTitle>
            <FileText className="h-4 w-4 text-accent flex-shrink-0" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Awaiting grading</p>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Class Average</CardTitle>
            <BarChart3 className="h-4 w-4 text-accent flex-shrink-0" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">82%</div>
            <p className="text-xs text-muted-foreground">Overall performance</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Quick Actions</CardTitle>
          <CardDescription className="text-xs sm:text-sm">Manage your courses and students</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <Link href="/courses" className="block">
              <Button className="w-full bg-accent hover:bg-accent/90 text-sm">
                View My Courses
              </Button>
            </Link>
            <Link href="/submissions" className="block">
              <Button variant="outline" className="w-full border-border text-sm">
                Grade Submissions
              </Button>
            </Link>
            <Link href="/students" className="block">
              <Button variant="outline" className="w-full border-border text-sm">
                View Students
              </Button>
            </Link>
            <Link href="/analytics" className="block">
              <Button variant="outline" className="w-full border-border text-sm">
                Class Analytics
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function StudentDashboard() {
  return (
    <div className="space-y-4 sm:space-y-6 py-4 sm:py-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Learning Dashboard</h1>
        <p className="text-sm sm:text-base text-muted-foreground">Track your progress and complete practicals</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card className="border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Enrolled Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-accent flex-shrink-0" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Currently active</p>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Submissions</CardTitle>
            <FileText className="h-4 w-4 text-accent flex-shrink-0" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">6</div>
            <p className="text-xs text-muted-foreground">4 graded, 2 pending</p>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Current Grade</CardTitle>
            <BarChart3 className="h-4 w-4 text-accent flex-shrink-0" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">85%</div>
            <p className="text-xs text-muted-foreground">Overall average</p>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Completion</CardTitle>
            <BarChart3 className="h-4 w-4 text-accent flex-shrink-0" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">60%</div>
            <p className="text-xs text-muted-foreground">Course completion</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Quick Actions</CardTitle>
          <CardDescription className="text-xs sm:text-sm">Continue your learning journey</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <Link href="/courses" className="block">
              <Button className="w-full bg-accent hover:bg-accent/90 text-sm">
                My Courses
              </Button>
            </Link>
            <Link href="/practicals" className="block">
              <Button variant="outline" className="w-full border-border text-sm">
                Available Practicals
              </Button>
            </Link>
            <Link href="/submissions" className="block">
              <Button variant="outline" className="w-full border-border text-sm">
                My Submissions
              </Button>
            </Link>
            <Link href="/grades" className="block">
              <Button variant="outline" className="w-full border-border text-sm">
                My Grades
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
