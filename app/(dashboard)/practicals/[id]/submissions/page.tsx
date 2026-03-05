'use client';

import React from 'react';
import {
  MOCK_PRACTICALS,
  MOCK_LESSONS,
  MOCK_UNITS,
  MOCK_COURSES,
  MOCK_ASSESSMENTS,
} from '@/lib/data';
import { useAuth } from '@/lib/auth-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ChevronLeft, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { notFound } from 'next/navigation';

export default function PracticalSubmissionsPage({
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

  if (user.role === 'student') {
    notFound();
  }

  const lesson = MOCK_LESSONS.find(l => l.id === practical.lessonId);
  const unit = MOCK_UNITS.find(u => u.id === lesson?.unitId);
  const course = MOCK_COURSES.find(c => c.id === unit?.courseId);

  // Mock submissions data - normally would come from database
  const mockSubmissions = practical.submissions.map((id, idx) => ({
    id,
    studentId: `student-${(idx % 5) + 1}`,
    studentName: [
      'Nana Boateng',
      'Yaa Kufuor',
      'Kofi Mensah',
      'Abena Anane',
      'Kweku Nyarko',
    ][idx % 5],
    submittedAt: new Date(
      Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000,
    ).toISOString(),
    status: Math.random() > 0.3 ? 'graded' : 'submitted',
    grade: Math.random() > 0.3 ? Math.round(75 + Math.random() * 20) : null,
  }));

  return (
    <div className="space-y-6 py-6">
      {/* Header */}
      <div className="flex items-start gap-4">
        <Link href={`/practicals/${id}`}>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <ChevronLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-foreground">
            {practical.title} - Submissions
          </h1>
          <p className="text-muted-foreground mt-1">
            Review and grade student submissions
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Submissions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockSubmissions.length}</div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Graded
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">
              {mockSubmissions.filter(s => s.status === 'graded').length}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-500">
              {mockSubmissions.filter(s => s.status === 'submitted').length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Submissions Table */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Student Submissions</CardTitle>
          <CardDescription>
            Click on a submission to view details and grade
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {mockSubmissions.map((submission) => (
              <Link
                key={submission.id}
                href={`/submissions/${submission.id}`}
              >
                <div className="flex items-center justify-between p-4 rounded-lg border border-border/30 hover:bg-secondary/50 hover:border-accent/50 transition-all cursor-pointer group">
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground group-hover:text-accent transition-colors">
                      {submission.studentName}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Submitted{' '}
                      {new Date(submission.submittedAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    {submission.status === 'graded' && submission.grade ? (
                      <div className="text-right">
                        <div className="text-2xl font-bold text-accent">
                          {submission.grade}%
                        </div>
                        <p className="text-xs text-muted-foreground">Score</p>
                      </div>
                    ) : (
                      <div className="text-right">
                        <Badge className="bg-amber-500/20 text-amber-700 border-amber-500/30">
                          Pending
                        </Badge>
                      </div>
                    )}

                    {submission.status === 'graded' ? (
                      <CheckCircle className="w-5 h-5 text-accent" />
                    ) : (
                      <Clock className="w-5 h-5 text-amber-500" />
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
