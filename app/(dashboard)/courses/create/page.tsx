'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ArrowLeft, CheckCircle } from 'lucide-react';

export default function CreateCoursePage() {
  const { user } = useAuth();
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    title: '',
    code: '',
    description: '',
    instructorId: 'inst-001',
    startDate: '',
    endDate: '',
    status: 'active',
  });

  if (!user || user.role !== 'admin') return null;

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <CheckCircle className="w-16 h-16 text-green-500" />
        <h2 className="text-2xl font-bold text-foreground">Course Created!</h2>
        <p className="text-muted-foreground text-center max-w-sm">
          <span className="font-semibold text-foreground">{form.title}</span> has been successfully created and is ready for students.
        </p>
        <div className="flex gap-3 mt-4">
          <Button variant="outline" asChild>
            <Link href="/courses">Back to Courses</Link>
          </Button>
          <Button className="bg-accent hover:bg-accent/90" onClick={() => setSubmitted(false)}>
            Create Another
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 py-6 max-w-2xl">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/courses">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Create Course</h1>
          <p className="text-muted-foreground">Add a new course to the system</p>
        </div>
      </div>

      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-lg">Course Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="title">Course Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="e.g. Advanced Trumpet Techniques"
                value={form.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="code">Course Code</Label>
              <Input
                id="code"
                name="code"
                placeholder="e.g. GAFMS-TRP-201"
                value={form.code}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                name="description"
                placeholder="Brief description of the course..."
                value={form.description}
                onChange={handleChange}
                required
                rows={3}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="instructorId">Assign Instructor</Label>
              <select
                id="instructorId"
                name="instructorId"
                value={form.instructorId}
                onChange={handleChange}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="inst-001">Major Sarah Osei</option>
                <option value="inst-002">Captain Kwesi Asante</option>
                <option value="inst-003">Lieutenant Ama Adjei</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  name="startDate"
                  type="date"
                  value={form.startDate}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  name="endDate"
                  type="date"
                  value={form.endDate}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Status</Label>
              <div className="flex gap-3">
                {(['active', 'inactive'] as const).map(s => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setForm(prev => ({ ...prev, status: s }))}
                    className="focus:outline-none"
                  >
                    <Badge
                      variant={form.status === s ? 'default' : 'outline'}
                      className={
                        form.status === s && s === 'active'
                          ? 'bg-accent/20 text-accent border-accent/30 cursor-pointer'
                          : 'cursor-pointer'
                      }
                    >
                      {s}
                    </Badge>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <Button type="submit" className="bg-accent hover:bg-accent/90">
                Create Course
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link href="/courses">Cancel</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
