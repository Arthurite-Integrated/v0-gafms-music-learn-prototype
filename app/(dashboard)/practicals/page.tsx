'use client';

import { MOCK_PRACTICALS, MOCK_LESSONS, MOCK_UNITS, MOCK_COURSES } from '@/lib/data';
import { useAuth } from '@/lib/auth-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Calendar, Clock, AlertCircle } from 'lucide-react';

export default function PracticalsPage() {
  const { user } = useAuth();

  if (!user) return null;

  // Get all practicals student is assigned to or instructor teaches
  const allPracticals = MOCK_PRACTICALS.map((practical) => {
    const lesson = MOCK_LESSONS.find(l => l.id === practical.lessonId);
    const unit = MOCK_UNITS.find(u => u.id === lesson?.unitId);
    const course = MOCK_COURSES.find(c => c.id === unit?.courseId);
    return { practical, lesson, unit, course };
  });

  let filteredPracticals = allPracticals;

  if (user.role === 'student') {
    filteredPracticals = allPracticals.filter(
      p => user.enrolledCourses?.includes(p.course!.id),
    );
  } else if (user.role === 'instructor') {
    filteredPracticals = allPracticals.filter(
      p => p.course?.instructorId === user.id,
    );
  }

  const now = new Date();
  const overdue = filteredPracticals.filter(
    p => new Date(p.practical.dueDate) < now,
  );
  const upcoming = filteredPracticals.filter(
    p => new Date(p.practical.dueDate) >= now,
  );

  return (
    <div className="space-y-6 py-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Practicals</h1>
        <p className="text-muted-foreground">
          {user.role === 'student'
            ? 'Performance tasks for your courses'
            : 'Practicals in your courses'}
        </p>
      </div>

      {/* Overdue Alert */}
      {user.role === 'student' && overdue.length > 0 && (
        <Card className="border-destructive/50 bg-destructive/5">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-destructive">
                  {overdue.length} Overdue Practical{overdue.length !== 1 ? 's' : ''}
                </h3>
                <p className="text-sm text-muted-foreground">
                  Please submit as soon as possible
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Upcoming Practicals */}
      {upcoming.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">
            {user.role === 'student' ? 'Your Practicals' : 'Active Practicals'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcoming.map(({ practical, lesson, unit, course }) => {
              const daysUntilDue = Math.ceil(
                (new Date(practical.dueDate).getTime() - now.getTime()) /
                  (1000 * 60 * 60 * 24),
              );
              const isUrgent = daysUntilDue <= 3;

              return (
                <Link
                  key={practical.id}
                  href={`/practicals/${practical.id}`}
                >
                  <Card className="border-border/50 hover:border-accent/50 transition-all hover:shadow-lg h-full cursor-pointer">
                    <CardHeader>
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex-1">
                          <CardTitle className="line-clamp-2">
                            {practical.title}
                          </CardTitle>
                          <CardDescription className="text-xs mt-2">
                            {course?.code}
                          </CardDescription>
                        </div>
                        {isUrgent && (
                          <Badge className="bg-destructive/20 text-destructive border-destructive/30 shrink-0">
                            Urgent
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {practical.description}
                      </p>

                      <div className="space-y-3">
                        <div className="text-xs text-muted-foreground">
                          <div className="font-medium text-foreground mb-1">
                            {course?.title}
                          </div>
                          <div>{unit?.title}</div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 pt-2 border-t border-border/30">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Due Date</span>
                          <span className="font-medium">
                            {new Date(practical.dueDate).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">
                            {daysUntilDue > 0
                              ? `${daysUntilDue} days left`
                              : 'Overdue'}
                          </span>
                          <Badge
                            variant={isUrgent ? 'destructive' : 'secondary'}
                            className={
                              isUrgent
                                ? ''
                                : 'bg-accent/20 text-accent border-accent/30'
                            }
                          >
                            {practical.submissions.length} submission
                            {practical.submissions.length !== 1 ? 's' : ''}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Completed/Past Practicals */}
      {overdue.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-muted-foreground">
            Past Practicals
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 opacity-60">
            {overdue.map(({ practical, lesson, unit, course }) => (
              <Link
                key={practical.id}
                href={`/practicals/${practical.id}`}
              >
                <Card className="border-border/50 cursor-pointer">
                  <CardHeader>
                    <CardTitle className="line-clamp-2">
                      {practical.title}
                    </CardTitle>
                    <CardDescription className="text-xs mt-2">
                      {course?.code}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xs text-muted-foreground">
                      Due: {new Date(practical.dueDate).toLocaleDateString()}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}

      {filteredPracticals.length === 0 && (
        <Card className="border-border/50">
          <CardContent className="py-12 text-center">
            <Clock className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
            <h3 className="font-semibold text-foreground mb-2">
              No Practicals
            </h3>
            <p className="text-muted-foreground">
              {user.role === 'student'
                ? 'You have no practicals available yet.'
                : 'No practicals to manage.'}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
