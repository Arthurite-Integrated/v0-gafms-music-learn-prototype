'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const performanceData = [
  { name: 'Technical', value: 82 },
  { name: 'Musicality', value: 78 },
  { name: 'Rhythm', value: 85 },
  { name: 'Tone', value: 80 },
];

const gradesData = [
  { week: 'Week 1', average: 75 },
  { week: 'Week 2', average: 78 },
  { week: 'Week 3', average: 80 },
  { week: 'Week 4', average: 82 },
  { week: 'Week 5', average: 81 },
  { week: 'Week 6', average: 84 },
];

const gradeDistribution = [
  { name: '90-100', value: 2, fill: '#22c55e' },
  { name: '80-89', value: 4, fill: '#0ea5e9' },
  { name: '70-79', value: 2, fill: '#f59e0b' },
  { name: '60-69', value: 1, fill: '#ef4444' },
];

const coursePerformance = [
  { course: 'Trumpet Fund.', average: 84, students: 12 },
  { course: 'Music Theory', average: 78, students: 15 },
  { course: 'Percussion', average: 81, students: 10 },
  { course: 'Conducting', average: 86, students: 8 },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6 py-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
        <p className="text-muted-foreground">
          System-wide performance and engagement metrics
        </p>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Avg Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">82%</div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">
              Submissions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">
              Completion Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Grade Trend */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Grade Trends</CardTitle>
            <CardDescription>Average scores over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={gradesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis stroke="rgba(255,255,255,0.5)" style={{ fontSize: '12px' }} />
                <YAxis stroke="rgba(255,255,255,0.5)" style={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="average"
                  stroke="#55b7ff"
                  strokeWidth={2}
                  dot={{ fill: '#55b7ff' }}
                  name="Average Score"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Performance by Criteria */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Performance Criteria</CardTitle>
            <CardDescription>Average scores by assessment category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis stroke="rgba(255,255,255,0.5)" style={{ fontSize: '12px' }} />
                <YAxis stroke="rgba(255,255,255,0.5)" style={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="value" fill="#55b7ff" name="Score" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Grade Distribution */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Grade Distribution</CardTitle>
            <CardDescription>Student grades breakdown</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={gradeDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {gradeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Course Performance */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Course Performance</CardTitle>
            <CardDescription>Average scores by course</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {coursePerformance.map((course) => (
                <div key={course.course}>
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <p className="font-medium text-foreground text-sm">
                        {course.course}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {course.students} students
                      </p>
                    </div>
                    <span className="text-lg font-bold text-accent">
                      {course.average}%
                    </span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div
                      className="bg-accent h-2 rounded-full"
                      style={{ width: `${course.average}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
