'use client';

import { MOCK_COURSES, MOCK_UNITS, MOCK_LESSONS } from '@/lib/data';
import { useAuth } from '@/lib/auth-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { BookOpen, Users, Calendar, ChevronRight } from 'lucide-react';

export default function CoursesPage() {
  const { user } = useAuth();

  if (!user) return null;

  // Filter courses based on user role
  let courses = MOCK_COURSES;
  if (user.role === 'instructor') {
    courses = MOCK_COURSES.filter(c => c.instructorId === user.id);
  } else if (user.role === 'student') {
    courses = MOCK_COURSES.filter(c =>
      user.enrolledCourses?.includes(c.id),
    );
  }

  return (
    <div className="space-y-6 py-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Courses</h1>
          <p className="text-muted-foreground">
            {user.role === 'student'
              ? 'Your enrolled courses'
              : user.role === 'instructor'
                ? 'Courses you teach'
                : 'All system courses'}
          </p>
        </div>
        {user.role === 'admin' && (
          <Link href="/courses/create">
            <Button className="bg-accent hover:bg-accent/90">
              Create Course
            </Button>
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map((course) => {
          const instructor = MOCK_COURSES.find(c => c.id === course.id);
          const courseUnits = MOCK_UNITS.filter(u =>
            course.units.includes(u.id),
          );
          const courseLessons = courseUnits.flatMap(u =>
            MOCK_LESSONS.filter(l => u.lessons.includes(l.id)),
          );

          return (
            <Link key={course.id} href={`/courses/${course.id}`}>
              <Card className="border-border/50 hover:border-accent/50 transition-all hover:shadow-lg h-full cursor-pointer">
                <CardHeader>
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <CardTitle className="line-clamp-2">{course.title}</CardTitle>
                      <CardDescription className="text-xs mt-2">
                        {course.code}
                      </CardDescription>
                    </div>
                    <Badge
                      variant={
                        course.status === 'active' ? 'default' : 'secondary'
                      }
                      className={
                        course.status === 'active'
                          ? 'bg-accent/20 text-accent border-accent/30'
                          : ''
                      }
                    >
                      {course.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {course.description}
                  </p>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <BookOpen className="w-4 h-4" />
                        <span className="text-xs">Units</span>
                      </div>
                      <span className="text-lg font-semibold">
                        {courseUnits.length}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-xs">Lessons</span>
                      </div>
                      <span className="text-lg font-semibold">
                        {courseLessons.length}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span className="text-xs">Duration</span>
                      </div>
                      <span className="text-lg font-semibold">
                        {Math.ceil(
                          (new Date(course.endDate).getTime() -
                            new Date(course.startDate).getTime()) /
                            (1000 * 60 * 60 * 24 * 7),
                        )}
                        w
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border/30">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {new Date(course.startDate).toLocaleDateString()}
                      </span>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="gap-2 text-accent hover:bg-accent/10 hover:text-accent"
                    >
                      View
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {courses.length === 0 && (
        <Card className="border-border/50">
          <CardContent className="py-12 text-center">
            <BookOpen className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
            <h3 className="font-semibold text-foreground mb-2">No Courses</h3>
            <p className="text-muted-foreground">
              {user.role === 'student'
                ? 'You are not enrolled in any courses yet.'
                : 'No courses found.'}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
