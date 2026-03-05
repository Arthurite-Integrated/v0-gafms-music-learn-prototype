'use client';

import React from 'react';
import { MOCK_ASSESSMENTS } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';
import { ChevronLeft, CheckCircle, Download, Lightbulb } from 'lucide-react';
import { notFound } from 'next/navigation';

export default function SubmissionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);

  // Mock submission data
  const mockSubmissions: Record<
    string,
    {
      id: string;
      practical: string;
      student: string;
      submittedAt: string;
      fileName: string;
      fileType: string;
    }
  > = {
    'submission-001': {
      id: 'submission-001',
      practical: 'Embouchure Formation Practical',
      student: 'Nana Boateng',
      submittedAt: '2024-02-28T14:30:00Z',
      fileName: 'embouchure_formation_take2.mp4',
      fileType: 'video/mp4',
    },
    'submission-002': {
      id: 'submission-002',
      practical: 'Embouchure Formation Practical',
      student: 'Yaa Kufuor',
      submittedAt: '2024-02-28T15:45:00Z',
      fileName: 'embouchure_formation.mp4',
      fileType: 'video/mp4',
    },
    'submission-003': {
      id: 'submission-003',
      practical: 'Embouchure Formation Practical',
      student: 'Kofi Mensah',
      submittedAt: '2024-02-29T10:15:00Z',
      fileName: 'embouchure_practice.mp4',
      fileType: 'video/mp4',
    },
    'submission-004': {
      id: 'submission-004',
      practical: 'Major Scales Performance',
      student: 'Abena Anane',
      submittedAt: '2024-03-15T11:20:00Z',
      fileName: 'scales_performance.mp3',
      fileType: 'audio/mp3',
    },
    'submission-005': {
      id: 'submission-005',
      practical: 'Major Scales Performance',
      student: 'Kweku Nyarko',
      submittedAt: '2024-03-15T09:00:00Z',
      fileName: 'all_scales.mp3',
      fileType: 'audio/mp3',
    },
    'submission-006': {
      id: 'submission-006',
      practical: 'Solo Performance',
      student: 'Nana Boateng',
      submittedAt: '2024-04-10T16:30:00Z',
      fileName: 'trumpet_solo.mp4',
      fileType: 'video/mp4',
    },
    'submission-007': {
      id: 'submission-007',
      practical: 'Drum Kit Groove Performance',
      student: 'Yaa Kufuor',
      submittedAt: '2024-03-20T14:15:00Z',
      fileName: 'drum_grooves.mp4',
      fileType: 'video/mp4',
    },
    'submission-008': {
      id: 'submission-008',
      practical: 'Drum Kit Groove Performance',
      student: 'Kofi Mensah',
      submittedAt: '2024-03-20T13:45:00Z',
      fileName: 'groove_demo.mp4',
      fileType: 'video/mp4',
    },
  };

  const submission = mockSubmissions[id];
  const assessment = MOCK_ASSESSMENTS.find(a => a.submissionId === id);

  if (!submission) {
    notFound();
  }

  return (
    <div className="space-y-6 py-6">
      {/* Header */}
      <div className="flex items-start gap-4">
        <Link href={`/practicals/practical-001/submissions`}>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <ChevronLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-foreground">
            {submission.practical}
          </h1>
          <p className="text-muted-foreground mt-1">
            Submitted by {submission.student}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Submission Info */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Submission Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">
                  Student
                </h4>
                <p className="text-foreground">{submission.student}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">
                  Submitted At
                </h4>
                <p className="text-foreground">
                  {new Date(submission.submittedAt).toLocaleString()}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">
                  File
                </h4>
                <div className="flex items-center justify-between p-3 rounded-lg border border-border/30 bg-secondary/30">
                  <span className="text-foreground">{submission.fileName}</span>
                  <Button size="sm" variant="ghost" className="text-accent hover:bg-accent/10">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Assessment Results */}
          {assessment && (
            <Card className="border-border/50">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>AI Performance Assessment</CardTitle>
                    <CardDescription>
                      Automatically generated analysis
                    </CardDescription>
                  </div>
                  <Badge className="bg-accent/20 text-accent border-accent/30 shrink-0">
                    Auto-Graded
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Overall Score */}
                <div className="text-center py-4 border-b border-border/30">
                  <p className="text-muted-foreground text-sm mb-2">Overall Score</p>
                  <div className="text-5xl font-bold text-accent">
                    {assessment.overallScore}%
                  </div>
                </div>

                {/* Detailed Scores */}
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium text-foreground">
                        Technical Accuracy
                      </span>
                      <span className="text-sm font-semibold text-accent">
                        {assessment.technicalAccuracy}%
                      </span>
                    </div>
                    <Progress
                      value={assessment.technicalAccuracy}
                      className="h-2"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium text-foreground">
                        Musicality
                      </span>
                      <span className="text-sm font-semibold text-accent">
                        {assessment.musicality}%
                      </span>
                    </div>
                    <Progress
                      value={assessment.musicality}
                      className="h-2"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium text-foreground">Rhythm</span>
                      <span className="text-sm font-semibold text-accent">
                        {assessment.rhythm}%
                      </span>
                    </div>
                    <Progress value={assessment.rhythm} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium text-foreground">
                        Tonal Quality
                      </span>
                      <span className="text-sm font-semibold text-accent">
                        {assessment.tonalQuality}%
                      </span>
                    </div>
                    <Progress
                      value={assessment.tonalQuality}
                      className="h-2"
                    />
                  </div>
                </div>

                {/* Feedback */}
                <div className="pt-4 border-t border-border/30">
                  <h4 className="font-semibold text-foreground mb-2">Feedback</h4>
                  <p className="text-muted-foreground">{assessment.feedback}</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Improvement Suggestions */}
          {assessment && assessment.improvementSuggestions.length > 0 && (
            <Card className="border-border/50 border-accent/20 bg-accent/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-accent" />
                  Suggestions for Improvement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {assessment.improvementSuggestions.map(
                    (suggestion, idx) => (
                      <li
                        key={idx}
                        className="flex gap-3 text-sm text-foreground"
                      >
                        <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                        <span>{suggestion}</span>
                      </li>
                    ),
                  )}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <Card className="border-border/50 sticky top-4">
            <CardHeader>
              <CardTitle className="text-base">Grade Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {assessment ? (
                <>
                  <div className="text-center py-4">
                    <p className="text-4xl font-bold text-accent">
                      {assessment.overallScore}
                    </p>
                    <p className="text-xs text-muted-foreground">out of 100</p>
                  </div>
                  <Badge className="w-full justify-center bg-accent/20 text-accent border-accent/30 py-2 text-center">
                    Graded with AI
                  </Badge>
                  <p className="text-xs text-muted-foreground text-center">
                    Evaluated on{' '}
                    {new Date(assessment.generatedAt).toLocaleDateString()}
                  </p>
                </>
              ) : (
                <p className="text-muted-foreground text-center py-4">
                  Awaiting assessment
                </p>
              )}
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-base">Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full border-border">
                Add Manual Notes
              </Button>
              <Button variant="outline" className="w-full border-border">
                Contact Student
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
