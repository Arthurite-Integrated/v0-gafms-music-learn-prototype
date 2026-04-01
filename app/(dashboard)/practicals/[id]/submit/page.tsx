'use client';

import React, { useState, useEffect } from 'react';
import { MOCK_PRACTICALS, MOCK_LESSONS, MOCK_UNITS, MOCK_COURSES } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';
import { ChevronLeft, Upload, AlertCircle, CheckCircle, Loader2, Mail, Sparkles, TrendingUp, Target, Music, Star } from 'lucide-react';
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
      const technical = Math.floor(Math.random() * 18) + 74;
      const musicality = Math.floor(Math.random() * 18) + 72;
      const rhythm = Math.floor(Math.random() * 18) + 76;
      const tonal = Math.floor(Math.random() * 18) + 73;
      const overall = Math.round((technical + musicality + rhythm + tonal) / 4);
      const grade = overall >= 90 ? 'A' : overall >= 80 ? 'B' : overall >= 70 ? 'C' : 'D';
      const gradeLabel = overall >= 90 ? 'Excellent' : overall >= 80 ? 'Good' : overall >= 70 ? 'Satisfactory' : 'Needs Improvement';
      const results = {
        technicalAccuracy: technical,
        musicality,
        rhythm,
        tonalQuality: tonal,
        overall,
        grade,
        gradeLabel,
        tempo: Math.floor(Math.random() * 20) + 110,
        feedback: overall >= 85
          ? 'Strong overall performance with clear technical command. Your tone production is consistent and your phrasing shows musical maturity. Continue building on this solid foundation.'
          : overall >= 75
          ? 'Good effort with a generally solid performance. Some areas of technique are well-developed; focus on consistency across the full range of the instrument.'
          : 'Commendable attempt. The fundamentals are present but require more focused practice. Pay particular attention to breath support and evenness of tone.',
        improvements: overall >= 85
          ? ['Explore more expressive dynamic range in lyrical passages', 'Work on smooth legato transitions between registers', 'Develop musical phrasing beyond technical execution']
          : overall >= 75
          ? ['Practice long tones daily to improve tonal consistency', 'Focus on upper register stability with targeted exercises', 'Record yourself and listen back to identify pitch inconsistencies']
          : ['Strengthen breath support with daily breathing exercises', 'Use a tuner consistently during practice sessions', 'Slow down difficult passages and build speed gradually'],
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
          <Card className="border-green-500/40 bg-green-500/5">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center shrink-0">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <CardTitle className="text-foreground">Submission Graded by AI</CardTitle>
                  <CardDescription className="mt-1">
                    Your practical has been submitted and autonomously assessed
                  </CardDescription>
                </div>
                <Badge className="ml-auto bg-accent/20 text-accent border-accent/30 shrink-0 gap-1.5">
                  <Sparkles className="w-3 h-3" />
                  AI Graded
                </Badge>
              </div>
            </CardHeader>
          </Card>

          {/* Score Hero */}
          <Card className="border-border/50 overflow-hidden">
            <div className="bg-gradient-to-br from-accent/10 via-accent/5 to-transparent p-6">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="text-center shrink-0">
                  <div className="w-28 h-28 rounded-full border-4 border-accent/40 bg-accent/10 flex flex-col items-center justify-center">
                    <span className="text-4xl font-black text-accent">{analysisResults.grade}</span>
                    <span className="text-xs text-muted-foreground font-medium">{analysisResults.overall}%</span>
                  </div>
                  <p className="mt-2 text-sm font-semibold text-foreground">{analysisResults.gradeLabel}</p>
                </div>
                <div className="flex-1 space-y-3 w-full">
                  {[
                    { label: 'Technical Accuracy', value: analysisResults.technicalAccuracy, icon: Target },
                    { label: 'Musicality', value: analysisResults.musicality, icon: Music },
                    { label: 'Rhythm', value: analysisResults.rhythm, icon: TrendingUp },
                    { label: 'Tonal Quality', value: analysisResults.tonalQuality, icon: Star },
                  ].map(({ label, value, icon: Icon }) => (
                    <div key={label}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-foreground flex items-center gap-1.5">
                          <Icon className="w-3.5 h-3.5 text-accent" />
                          {label}
                        </span>
                        <span className="text-xs font-bold text-accent">{value}%</span>
                      </div>
                      <Progress value={value} className="h-1.5" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* AI Feedback */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <div className="w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-accent" />
                </div>
                AI Feedback
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed">{analysisResults.feedback}</p>
              <div className="flex items-center gap-2 pt-1">
                <div className="p-2 rounded-md bg-secondary/50 border border-border/30">
                  <p className="text-xs text-muted-foreground">Detected Tempo</p>
                  <p className="text-lg font-bold text-foreground">{analysisResults.tempo} <span className="text-xs font-normal text-muted-foreground">BPM</span></p>
                </div>
                <div className="p-2 rounded-md bg-secondary/50 border border-border/30">
                  <p className="text-xs text-muted-foreground">Overall Score</p>
                  <p className="text-lg font-bold text-accent">{analysisResults.overall}<span className="text-xs font-normal text-muted-foreground">%</span></p>
                </div>
                <div className="p-2 rounded-md bg-secondary/50 border border-border/30">
                  <p className="text-xs text-muted-foreground">Final Grade</p>
                  <p className="text-lg font-bold text-foreground">{analysisResults.grade}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Areas for Improvement */}
          <Card className="border-accent/20 bg-accent/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <TrendingUp className="w-5 h-5 text-accent" />
                Areas for Improvement
              </CardTitle>
              <CardDescription>Personalised recommendations from your AI assessment</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {analysisResults.improvements.map((item: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-background/60 border border-border/30">
                    <div className="w-5 h-5 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-accent">{idx + 1}</span>
                    </div>
                    <span className="text-sm text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card className="border-border/50">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle className="w-3.5 h-3.5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">Submission Received</p>
                  <p className="text-xs text-muted-foreground">File uploaded successfully</p>
                </div>
              </div>
              <div className="flex items-start gap-3 mb-4">
                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle className="w-3.5 h-3.5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">AI Analysis Complete</p>
                  <p className="text-xs text-muted-foreground">Performance assessed across all criteria</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle className="w-3.5 h-3.5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">Grading Complete</p>
                  <p className="text-xs text-muted-foreground">Your grade and feedback are ready</p>
                </div>
              </div>
              <div className="mt-4 p-3 rounded-lg bg-secondary/50 border border-border/50 flex items-start gap-3">
                <Mail className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <p className="text-xs text-muted-foreground">
                  ✓ Grade confirmation sent to your email
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button onClick={() => router.push('/practicals')} className="flex-1 bg-accent hover:bg-accent/90">
              Back to Practicals
            </Button>
            <Button onClick={() => router.push('/submissions')} variant="outline" className="flex-1 border-border">
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
                  <li>• File is uploaded securely</li>
                  <li>• AI analyses your performance</li>
                  <li>• Grade & feedback delivered instantly</li>
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
