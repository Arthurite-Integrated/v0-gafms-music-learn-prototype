'use client';

import React from 'react';
import { MOCK_COURSES, MOCK_UNITS, MOCK_LESSONS, MOCK_PRACTICALS } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import { ChevronLeft, Clock, FileText, Zap, BookOpen } from 'lucide-react';
import { notFound } from 'next/navigation';

export default function LessonDetailPage({
  params,
}: {
  params: Promise<{ id: string; unitId: string; lessonId: string }>;
}) {
  const { id: courseId, unitId, lessonId } = React.use(params);

  const course = MOCK_COURSES.find(c => c.id === courseId);
  const unit = MOCK_UNITS.find(u => u.id === unitId);
  const lesson = MOCK_LESSONS.find(l => l.id === lessonId);

  if (!course || !unit || !lesson) {
    notFound();
  }

  // Get related practicals for this lesson
  const relatedPracticals = MOCK_PRACTICALS.filter(
    p => p.lessonId === lessonId,
  );

  return (
    <div className="space-y-6 py-6">
      {/* Header */}
      <div className="flex items-start gap-4">
        <Link href={`/courses/${courseId}`}>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <ChevronLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-foreground">{lesson.title}</h1>
          <div className="flex items-center gap-2 mt-2 text-muted-foreground text-sm">
            <BookOpen className="w-4 h-4" />
            <span>{course.title}</span>
            <span>•</span>
            <span>{unit.title}</span>
          </div>
        </div>
      </div>

      {/* Quick Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Duration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-accent" />
              <span className="text-2xl font-bold">{lesson.duration}</span>
              <span className="text-muted-foreground">min</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Resources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-accent" />
              <span className="text-2xl font-bold">
                {lesson.resources.length}
              </span>
              <span className="text-muted-foreground">files</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Practicals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-accent" />
              <span className="text-2xl font-bold">
                {relatedPracticals.length}
              </span>
              <span className="text-muted-foreground">tasks</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content */}
      <Tabs defaultValue="content" className="space-y-4">
        <TabsList className="bg-secondary/50 border-border">
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="practicals">Practicals</TabsTrigger>
        </TabsList>

        <TabsContent value="content">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Lesson Content</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-invert max-w-none">
              <p className="text-foreground whitespace-pre-wrap">
                {lesson.content}
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="space-y-4">
          {lesson.resources.length > 0 ? (
            <div className="space-y-3">
              {lesson.resources.map((resource, idx) => (
                <Card key={idx} className="border-border/50">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-accent/10">
                        <FileText className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">
                          {resource}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          Course material
                        </p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-border hover:bg-accent/10"
                    >
                      Download
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="border-border/50">
              <CardContent className="py-8 text-center">
                <FileText className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                <p className="text-muted-foreground">No resources available</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="practicals" className="space-y-4">
          {relatedPracticals.length > 0 ? (
            <div className="space-y-3">
              {relatedPracticals.map((practical) => (
                <Link
                  key={practical.id}
                  href={`/practicals/${practical.id}`}
                >
                  <Card className="border-border/50 hover:border-accent/50 hover:shadow-lg transition-all cursor-pointer">
                    <CardHeader>
                      <CardTitle className="text-lg">
                        {practical.title}
                      </CardTitle>
                      <CardDescription>
                        {practical.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-xs text-muted-foreground">
                        <span>Due: {new Date(practical.dueDate).toLocaleDateString()}</span>
                        <span> • </span>
                        <span>Max attempts: {practical.maxAttempts}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <Card className="border-border/50">
              <CardContent className="py-8 text-center">
                <Zap className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                <p className="text-muted-foreground">
                  No practicals for this lesson
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
