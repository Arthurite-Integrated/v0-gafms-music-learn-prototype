'use client';

import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockDatabase } from '@/lib/data';
import Link from 'next/link';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';

export default function SubmissionsPage() {
  const { user } = useAuth();
  const router = useRouter();

  if (!user || (user.role !== 'instructor' && user.role !== 'admin')) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">You don't have access to this page.</p>
            <Button onClick={() => router.push('/dashboard')}>Return to Dashboard</Button>
          </div>
        </div>
      </div>
    );
  }

  const allSubmissions = mockDatabase.submissions
    .map(submission => {
      const practical = mockDatabase.practicals.find(p => p.id === submission.practicalId);
      const student = mockDatabase.users.find(u => u.id === submission.studentId);
      return {
        ...submission,
        practical,
        student
      };
    })
    .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'graded':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'submitted':
        return <AlertCircle className="w-5 h-5 text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 lg:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Student Submissions</h1>
          <p className="text-muted-foreground mt-2">Review and grade student practical submissions</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Submissions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{allSubmissions.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending Review</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-yellow-500">
                {allSubmissions.filter(s => s.status === 'submitted').length}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Graded</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-green-500">
                {allSubmissions.filter(s => s.status === 'graded').length}
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Submissions</CardTitle>
            <CardDescription>Latest submissions from students</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {allSubmissions.length === 0 ? (
                <p className="text-muted-foreground py-8 text-center">No submissions yet</p>
              ) : (
                allSubmissions.map((submission) => (
                  <Link key={submission.id} href={`/submissions/${submission.id}`}>
                    <div className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-card/50 transition-colors cursor-pointer">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="flex-shrink-0">
                          {getStatusIcon(submission.status)}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-foreground">{submission.student?.name}</p>
                          <p className="text-sm text-muted-foreground">{submission.practical?.title}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium capitalize">{submission.status}</p>
                        <p className="text-xs text-muted-foreground">{new Date(submission.submittedAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
