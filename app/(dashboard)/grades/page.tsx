'use client';

import { useAuth } from '@/lib/auth-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';
import { BarChart3, TrendingUp, Award } from 'lucide-react';

// Mock grades data
const mockGrades = [
  {
    id: 'grade-001',
    subject: 'Embouchure Formation Practical',
    score: 81,
    maxScore: 100,
    date: '2024-02-28',
    instructor: 'Major Sarah Osei',
    course: 'Trumpet Fundamentals',
  },
  {
    id: 'grade-002',
    subject: 'Major Scales Performance',
    score: 90,
    maxScore: 100,
    date: '2024-03-15',
    instructor: 'Major Sarah Osei',
    course: 'Trumpet Fundamentals',
  },
  {
    id: 'grade-003',
    subject: 'Music Theory Quiz 1',
    score: 78,
    maxScore: 100,
    date: '2024-03-10',
    instructor: 'Major Sarah Osei',
    course: 'Music Theory I',
  },
  {
    id: 'grade-004',
    subject: 'Solo Performance',
    score: 88,
    maxScore: 100,
    date: '2024-04-10',
    instructor: 'Major Sarah Osei',
    course: 'Trumpet Fundamentals',
  },
];

export default function GradesPage() {
  const { user } = useAuth();

  if (!user) return null;

  const average =
    mockGrades.reduce((sum, g) => sum + g.score, 0) / mockGrades.length;
  const highest = Math.max(...mockGrades.map(g => g.score));
  const lowest = Math.min(...mockGrades.map(g => g.score));

  // Group by course
  const courseGrades = mockGrades.reduce(
    (acc, grade) => {
      if (!acc[grade.course]) {
        acc[grade.course] = [];
      }
      acc[grade.course].push(grade);
      return acc;
    },
    {} as Record<string, typeof mockGrades>,
  );

  return (
    <div className="space-y-6 py-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">My Grades</h1>
        <p className="text-muted-foreground">
          View your scores and performance feedback
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <BarChart3 className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{average.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">Across all grades</p>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Highest</CardTitle>
            <TrendingUp className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{highest}%</div>
            <p className="text-xs text-muted-foreground">Best performance</p>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lowest</CardTitle>
            <TrendingUp className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lowest}%</div>
            <p className="text-xs text-muted-foreground">Needs improvement</p>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Grades</CardTitle>
            <Award className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockGrades.length}</div>
            <p className="text-xs text-muted-foreground">This semester</p>
          </CardContent>
        </Card>
      </div>

      {/* Grades by Course */}
      <div className="space-y-6">
        {Object.entries(courseGrades).map(([course, grades]) => {
          const courseAverage =
            grades.reduce((sum, g) => sum + g.score, 0) / grades.length;

          return (
            <Card key={course} className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">{course}</CardTitle>
                <CardDescription>
                  {grades.length} grade{grades.length !== 1 ? 's' : ''}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Course Average */}
                <div className="p-4 rounded-lg bg-secondary/30 border border-border/30">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-foreground">
                      Course Average
                    </span>
                    <span className="text-2xl font-bold text-accent">
                      {courseAverage.toFixed(1)}%
                    </span>
                  </div>
                  <Progress
                    value={courseAverage}
                    className="h-2"
                  />
                </div>

                {/* Individual Grades */}
                <div className="space-y-3">
                  {grades.map((grade) => (
                    <div
                      key={grade.id}
                      className="flex items-center justify-between p-3 rounded-lg border border-border/30 hover:bg-secondary/50 transition-colors"
                    >
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground">
                          {grade.subject}
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                          <span>{grade.instructor}</span>
                          <span>•</span>
                          <span>
                            {new Date(grade.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-accent">
                          {grade.score}%
                        </div>
                        <Badge
                          className={
                            grade.score >= 85
                              ? 'bg-accent/20 text-accent border-accent/30'
                              : grade.score >= 70
                                ? 'bg-blue-500/20 text-blue-600 border-blue-500/30'
                                : 'bg-amber-500/20 text-amber-700 border-amber-500/30'
                          }
                        >
                          {grade.score >= 85
                            ? 'Excellent'
                            : grade.score >= 70
                              ? 'Good'
                              : 'Fair'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
