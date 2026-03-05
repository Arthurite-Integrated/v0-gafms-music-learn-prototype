'use client';

import React, { useState, useEffect } from 'react';
import { MOCK_PRACTICALS, MOCK_LESSONS, MOCK_UNITS, MOCK_COURSES } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';
import { ChevronLeft, Upload, AlertCircle, CheckCircle, Loader2, Mail, Clock } from 'lucide-react';
import { notFound, useRouter } from 'next/navigation';

type AnalysisStep = 'uploading' | 'analyzing' | 'complete';

export default function SubmitPracticalPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { id } = React.use(params);
  const practical = MOCK_PRACTICALS.find(p => p.id === id);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [analysisStep, setAnalysisStep] = useState<AnalysisStep>('uploading');
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  const [notes, setNotes] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  if (!practical) {
    notFound();
  }

  const lesson = MOCK_LESSONS.find(l => l.id === practical.lessonId);
  const unit = MOCK_UNITS.find(u => u.id === lesson?.unitId);
  const course = MOCK_COURSES.find(c => c.id === unit?.courseId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitted(true);

    // Step 1: Uploading (2s)
    setTimeout(() => {
      setAnalysisStep('analyzing');
    }, 2000);

    // Step 2: AI Analysis (5-7s)
    setTimeout(() => {
      const results = {
        tempo: Math.floor(Math.random() * 20) + 110,
        rhythm: ['Good timing', 'Consistent beat', 'Minor timing variations detected'][Math.floor(Math.random() * 3)],
        pitch: ['Accurate pitch control', 'Mostly on pitch', 'Some pitch variations noted'][Math.floor(Math.random() * 3)],
        technique: ['Proper technique observed', 'Good hand positioning', 'Technique needs refinement'][Math.floor(Math.random() * 3)],
        overall: Math.floor(Math.random() * 15) + 75,
      };
      setAnalysisResults(results);
      setAnalysisStep('complete');
      setIsSubmitting(false);
    }, 7000);
  };

  if (submitted && analysisStep === 'complete' && analysisResults) {
    return (
      <div className="min-h-screen bg-background p-4 py-6">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Success Header */}
          <Card className="border-accent/50 bg-accent/5">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/20 border-2 border-accent flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <CardTitle>Submission Successful!</CardTitle>
                  <CardDescription className="mt-1">
                    Your practical has been submitted and analyzed
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* AI Analysis Results */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Loader2 className="w-4 h-4 text-accent" />
                </div>
                AI Analysis Results
              </CardTitle>
              <CardDescription>
                Automated assessment of your submission
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-secondary/50">
                  <p className="text-xs text-muted-foreground mb-1">Tempo</p>
                  <p className="text-2xl font-bold text-foreground">{analysisResults.tempo} BPM</p>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <p className="text-xs text-muted-foreground mb-1">Overall Score</p>
                  <p className="text-2xl font-bold text-accent">{analysisResults.overall}%</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="p-3 rounded-lg border border-border/50">
                  <p className="text-sm font-medium text-foreground mb-1">Rhythm Analysis</p>
                  <p className="text-sm text-muted-foreground">{analysisResults.rhythm}</p>
                </div>
                <div className="p-3 rounded-lg border border-border/50">
                  <p className="text-sm font-medium text-foreground mb-1">Pitch Accuracy</p>
                  <p className="text-sm text-muted-foreground">{analysisResults.pitch}</p>
                </div>
                <div className="p-3 rounded-lg border border-border/50">
                  <p className="text-sm font-medium text-foreground mb-1">Technique</p>
                  <p className="text-sm text-muted-foreground">{analysisResults.technique}</p>
                </div>
              </div>

              <Alert className="border-accent/50 bg-accent/5">
                <AlertCircle className="h-4 w-4 text-accent" />
                <AlertDescription className="text-sm">
                  This is an automated preliminary analysis. Your instructor will provide detailed feedback and final grading.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-accent" />
                Next Steps
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="w-4 h-4 text-background" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Submission Received</p>
                    <p className="text-sm text-muted-foreground">Your file has been uploaded successfully</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="w-4 h-4 text-background" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">AI Analysis Complete</p>
                    <p className="text-sm text-muted-foreground">Automated assessment has been generated</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full border-2 border-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Awaiting Instructor Review</p>
                    <p className="text-sm text-muted-foreground">Your instructor will review and provide final feedback</p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-secondary/50 border border-border/50">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Email Notifications Sent</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      ✓ Confirmation sent to your email<br />
                      ✓ Instructor notified for review
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={() => router.push('/practicals')}
              className="flex-1 bg-accent hover:bg-accent/90"
            >
              Back to Practicals
            </Button>
            <Button
              onClick={() => router.push('/submissions')}
              variant="outline"
              className="flex-1 border-border"
            >
              View My Submissions
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (submitted && isSubmitting) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full border-border/50">
          <CardContent className="pt-6">
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-full bg-accent/10 border-2 border-accent flex items-center justify-center">
                  <Loader2 className="w-8 h-8 text-accent animate-spin" />
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {analysisStep === 'uploading' && 'Uploading Submission...'}
                  {analysisStep === 'analyzing' && 'AI Analysis in Progress...'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {analysisStep === 'uploading' && 'Securely uploading your file to the server'}
                  {analysisStep === 'analyzing' && 'Analyzing tempo, rhythm, pitch, and technique'}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${analysisStep === 'uploading' ? 'bg-accent animate-pulse' : 'bg-accent'}`} />
                  <span className="text-sm text-muted-foreground">Uploading file</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${analysisStep === 'analyzing' ? 'bg-accent animate-pulse' : analysisStep === 'complete' ? 'bg-accent' : 'bg-border'}`} />
                  <span className="text-sm text-muted-foreground">Running AI analysis</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${analysisStep === 'complete' ? 'bg-accent' : 'bg-border'}`} />
                  <span className="text-sm text-muted-foreground">Generating results</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

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
            Submit: {practical.title}
          </h1>
          <p className="text-muted-foreground mt-1">
            Complete your submission for this practical
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Requirements Checklist */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Requirements Checklist</CardTitle>
                <CardDescription>
                  Make sure your submission meets all requirements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {practical.requirements.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-border mt-1"
                      />
                      <span className="text-foreground text-sm">{req}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* File Upload */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Upload Your Work</CardTitle>
                <CardDescription>
                  Select the file with your submission
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div
                  className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:bg-secondary/30 transition-colors cursor-pointer group"
                  onClick={() =>
                    document.getElementById('file-input')?.click()
                  }
                >
                  <Upload className="w-8 h-8 text-muted-foreground group-hover:text-accent mx-auto mb-2 transition-colors" />
                  <p className="font-medium text-foreground group-hover:text-accent transition-colors">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground">
                    MP4, MOV, MP3, or WAV
                  </p>
                  <input
                    id="file-input"
                    type="file"
                    accept=".mp4,.mov,.mp3,.wav,.m4a"
                    onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                    className="hidden"
                  />
                </div>

                {selectedFile && (
                  <div className="p-3 rounded-lg bg-accent/5 border border-accent/20">
                    <p className="text-sm text-foreground font-medium">
                      Selected: {selectedFile.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Notes */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Additional Notes</CardTitle>
                <CardDescription>Optional: Add any notes or context</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Any additional information about your submission..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="bg-input border-border/50"
                  rows={4}
                />
              </CardContent>
            </Card>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={!selectedFile || isSubmitting}
              className="w-full bg-accent hover:bg-accent/90 h-11"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Practical'}
            </Button>
          </form>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Info Card */}
          <Card className="border-border/50 sticky top-4">
            <CardHeader>
              <CardTitle className="text-base">Submission Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-xs text-muted-foreground">Course</p>
                <p className="font-medium text-foreground">{course?.title}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Unit</p>
                <p className="font-medium text-foreground">{unit?.title}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Due Date</p>
                <p className="font-medium text-foreground">
                  {new Date(practical.dueDate).toLocaleDateString()}
                </p>
              </div>
              <div className="pt-4 border-t border-border/30">
                <p className="text-xs font-medium text-muted-foreground mb-2">
                  What happens next?
                </p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• AI analysis runs automatically</li>
                  <li>• Instructor reviews submission</li>
                  <li>• You receive feedback & grade</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Help Card */}
          <Alert className="border-border/50">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-xs">
              Make sure your file is clear and meets all the requirements listed above.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  );
}
