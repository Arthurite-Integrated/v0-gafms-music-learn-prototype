'use client';

import { MOCK_COURSES, MOCK_UNITS, MOCK_LESSONS } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import { ChevronLeft, BookOpen, Clock, FileText } from 'lucide-react';
import { notFound } from 'next/navigation';

export default function CourseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);
  const course = MOCK_COURSES.find(c => c.id === id);

  if (!course) {
    notFound();
  }

  const units = MOCK_UNITS.filter(u => course.units.includes(u.id)).sort(
    (a, b) => a.order - b.order,
  );

  return (
    <div className="space-y-6 py-6">
      {/* Header */}
      <div className="flex items-start gap-4">
        <Link href="/courses">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <ChevronLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-foreground">{course.title}</h1>
          <div className="flex items-center gap-4 mt-2 text-muted-foreground text-sm">
            <span>{course.code}</span>
            <Badge
              variant={course.status === 'active' ? 'default' : 'secondary'}
              className={
                course.status === 'active'
                  ? 'bg-accent/20 text-accent border-accent/30'
                  : ''
              }
            >
              {course.status}
            </Badge>
          </div>
        </div>
      </div>

      {/* Overview Card */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Course Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground">{course.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span className="text-sm font-medium">Start Date</span>
              </div>
              <p className="text-foreground">
                {new Date(course.startDate).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span className="text-sm font-medium">End Date</span>
              </div>
              <p className="text-foreground">
                {new Date(course.endDate).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <BookOpen className="w-4 h-4" />
                <span className="text-sm font-medium">Units</span>
              </div>
              <p className="text-foreground">{units.length} units</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Units and Lessons */}
      <Tabs defaultValue="units" className="space-y-4">
        <TabsList className="bg-secondary/50 border-border">
          <TabsTrigger value="units">Units & Lessons</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="units" className="space-y-4">
          {units.map((unit) => {
            const unitLessons = MOCK_LESSONS.filter(l =>
              unit.lessons.includes(l.id),
            ).sort((a, b) => a.order - b.order);

            return (
              <Card key={unit.id} className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg">
                    Unit {unit.order}: {unit.title}
                  </CardTitle>
                  <CardDescription>{unit.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {unitLessons.map((lesson) => (
                      <Link
                        key={lesson.id}
                        href={`/courses/${course.id}/units/${unit.id}/lessons/${lesson.id}`}
                      >
                        <div className="flex items-start gap-4 p-3 rounded-lg border border-border/30 hover:bg-secondary/50 hover:border-accent/50 transition-all cursor-pointer group">
                          <div className="pt-1 text-muted-foreground group-hover:text-accent transition-colors">
                            <FileText className="w-5 h-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-foreground group-hover:text-accent transition-colors">
                              {lesson.title}
                            </h4>
                            <p className="text-sm text-muted-foreground line-clamp-1">
                              {lesson.description}
                            </p>
                            <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                              <Clock className="w-3 h-3" />
                              <span>{lesson.duration} minutes</span>
                              {lesson.resources.length > 0 && (
                                <>
                                  <span>•</span>
                                  <span>{lesson.resources.length} resources</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>

        <TabsContent value="resources">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Course Resources</CardTitle>
              <CardDescription>
                Downloadable materials and references
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Resources are available within individual lessons. Navigate to a lesson to download materials.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

import React from 'react';
import { Calendar } from 'lucide-react';
