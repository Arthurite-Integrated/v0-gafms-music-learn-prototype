'use client';

import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileText, BarChart3, Calendar } from 'lucide-react';

export default function ReportsPage() {
  const { user } = useAuth();
  const router = useRouter();

  if (!user || user.role !== 'admin') {
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

  const reports = [
    {
      id: 1,
      title: 'Student Performance Report',
      description: 'Comprehensive performance metrics across all courses',
      icon: BarChart3,
      date: '2025-03-05'
    },
    {
      id: 2,
      title: 'Course Enrollment Report',
      description: 'Enrollment statistics and course participation',
      icon: FileText,
      date: '2025-03-05'
    },
    {
      id: 3,
      title: 'Assessment Report',
      description: 'AI assessment results and performance trends',
      icon: BarChart3,
      date: '2025-03-04'
    },
    {
      id: 4,
      title: 'Attendance Report',
      description: 'Student attendance and engagement metrics',
      icon: Calendar,
      date: '2025-03-03'
    }
  ];

  return (
    <div className="min-h-screen bg-background p-4 lg:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reports</h1>
          <p className="text-muted-foreground mt-2">Access and download system reports</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reports.map((report) => {
            const Icon = report.icon;
            return (
              <Card key={report.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <CardTitle className="flex items-center gap-2">
                        <Icon className="w-5 h-5 text-accent" />
                        {report.title}
                      </CardTitle>
                      <CardDescription>{report.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Generated: {report.date}</span>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Generate Custom Report</CardTitle>
            <CardDescription>Create a custom report based on date range and filters</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Start Date</label>
                  <input type="date" className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">End Date</label>
                  <input type="date" className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground" />
                </div>
              </div>
              <Button className="w-full">Generate Report</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
