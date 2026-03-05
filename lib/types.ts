// User roles
export type UserRole = 'admin' | 'instructor' | 'student';

// User
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: 'active' | 'inactive';
  enrolledCourses?: string[]; // Course IDs
  taughtCourses?: string[]; // Course IDs
  profileImage?: string;
}

// Course
export interface Course {
  id: string;
  title: string;
  description: string;
  code: string;
  instructorId: string;
  units: string[]; // Unit IDs
  createdAt: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'archived' | 'draft';
}

// Unit
export interface Unit {
  id: string;
  courseId: string;
  title: string;
  description: string;
  lessons: string[]; // Lesson IDs
  order: number;
}

// Lesson
export interface Lesson {
  id: string;
  unitId: string;
  title: string;
  description: string;
  content: string;
  resources: string[]; // URLs or resource names
  duration: number; // minutes
  order: number;
}

// Practical
export interface Practical {
  id: string;
  lessonId: string;
  title: string;
  description: string;
  requirements: string[];
  dueDate: string;
  submissions: string[]; // Submission IDs
  maxAttempts: number;
}

// Submission
export interface Submission {
  id: string;
  practicalId: string;
  studentId: string;
  content: string; // File reference or text
  status: 'submitted' | 'graded' | 'pending';
  submittedAt: string;
  grade: Grade | null;
}

// Grade
export interface Grade {
  id: string;
  submissionId: string;
  score: number; // 0-100
  feedback: string;
  criteria: GradingCriteria[];
  generatedAt: string;
  gradedBy: string; // Instructor ID
}

// Grading Criteria
export interface GradingCriteria {
  name: string;
  score: number; // 0-100
}

// Performance Assessment (AI-generated)
export interface PerformanceAssessment {
  id: string;
  submissionId: string;
  technicalAccuracy: number; // 0-100
  musicality: number; // 0-100
  rhythm: number; // 0-100
  tonalQuality: number; // 0-100
  overallScore: number; // 0-100
  feedback: string;
  generatedAt: string;
  improvementSuggestions: string[];
}

// Auth context
export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// API Response
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
