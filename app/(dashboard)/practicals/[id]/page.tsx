'use client';

import React from 'react';
import { MOCK_PRACTICALS, MOCK_LESSONS, MOCK_UNITS, MOCK_COURSES } from '@/lib/data';
import { useAuth } from '@/lib/auth-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ChevronLeft, Calendar, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { notFound } from 'next/navigation';

export default function PracticalDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);
  const { user } = useAuth();
  const practical = MOCK_PRACTICALS.find(p => p.id === id);

  if (!practical || !user) {
    notFound();
  }

  const lesson = MOCK_LESSONS.find(l => l.id === practical.lessonId);
  const unit = MOCK_UNITS.find(u => u.id === lesson?.unitId);
  const course = MOCK_COURSES.find(c => c.id === unit?.courseId);

  const now = new Date();
  const dueDate = new Date(practical.dueDate);
  const isOverdue = now > dueDate;
  const daysUntilDue = Math.ceil(
    (dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
  );

  return (
    <div className="space-y-6 py-6">
      {/* Header */}
      <div className="flex items-start gap-4">
        <Link href="/practicals">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <ChevronLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-foreground">
            {practical.title}
          </h1>
          <div className="flex items-center gap-2 mt-2 text-muted-foreground text-sm">
            <span>{course?.code}</span>
            {isOverdue && (
              <Badge className="bg-destructive/20 text-destructive border-destructive/30">
                Overdue
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Status Alert */}
      {isOverdue ? (
        <Card className="border-destructive/50 bg-destructive/5">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-destructive">
                  This practical is overdue
                </h3>
                <p className="text-sm text-muted-foreground">
                  Due date was {dueDate.toLocaleDateString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : daysUntilDue <= 3 ? (
        <Card className="border-amber-500/50 bg-amber-500/5">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-amber-700">
                  Due in {daysUntilDue} days
                </h3>
                <p className="text-sm text-muted-foreground">
                  {dueDate.toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-border/50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground">
                  Due {dueDate.toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                  })}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {daysUntilDue} days remaining
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Description */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-foreground">{practical.description}</p>

              <div className="pt-4 border-t border-border/30 space-y-3">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">
                    Course Context
                  </h4>
                  <div className="space-y-1 text-sm">
                    <div className="text-foreground">{course?.title}</div>
                    <div className="text-muted-foreground">{unit?.title}</div>
                    <div className="text-muted-foreground text-xs">
                      {lesson?.title}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {practical.requirements.map((req, idx) => (
                  <li key={idx} className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">{req}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Side Info */}
        <div className="space-y-4">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-base">Submission Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-xs text-muted-foreground">Maximum Attempts</p>
                <p className="text-2xl font-bold text-foreground">
                  {practical.maxAttempts}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Current Submissions</p>
                <p className="text-2xl font-bold text-foreground">
                  {practical.submissions.length}
                </p>
              </div>
              {user.role === 'student' && (
                <Link href={`/practicals/${id}/submit`}>
                  <Button className="w-full bg-accent hover:bg-accent/90">
                    Submit Practical
                  </Button>
                </Link>
              )}
              {user.role === 'instructor' && (
                <Link href={`/practicals/${id}/submissions`}>
                  <Button
                    variant="outline"
                    className="w-full border-border"
                  >
                    Review Submissions
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-base">Timeline</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <p className="text-muted-foreground">Due Date</p>
                <p className="font-medium text-foreground">
                  {dueDate.toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Status</p>
                <Badge
                  className={
                    isOverdue
                      ? 'bg-destructive/20 text-destructive border-destructive/30'
                      : daysUntilDue <= 3
                        ? 'bg-amber-500/20 text-amber-700 border-amber-500/30'
                        : 'bg-accent/20 text-accent border-accent/30'
                  }
                >
                  {isOverdue
                    ? 'Overdue'
                    : daysUntilDue <= 0
                      ? 'Due Today'
                      : `${daysUntilDue} days left`}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Submissions List */}
      {user.role === 'instructor' && (
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Recent Submissions</CardTitle>
            <CardDescription>
              {practical.submissions.length} total submission
              {practical.submissions.length !== 1 ? 's' : ''}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href={`/practicals/${id}/submissions`}>
              <Button variant="outline" className="border-border">
                View All Submissions
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
