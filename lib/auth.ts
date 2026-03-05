import type { User, UserRole } from './types';

// Demo users for testing
const DEMO_USERS: Record<string, { email: string; password: string; user: User }> = {
  admin1: {
    email: 'admin@gafms.mil',
    password: 'admin123',
    user: {
      id: 'admin-001',
      name: 'Colonel John Mensah',
      email: 'admin@gafms.mil',
      role: 'admin',
      status: 'active',
      taughtCourses: [],
    },
  },
  instructor1: {
    email: 'instructor1@gafms.mil',
    password: 'inst123',
    user: {
      id: 'inst-001',
      name: 'Major Sarah Osei',
      email: 'instructor1@gafms.mil',
      role: 'instructor',
      status: 'active',
      taughtCourses: ['course-001', 'course-002'],
    },
  },
  instructor2: {
    email: 'instructor2@gafms.mil',
    password: 'inst123',
    user: {
      id: 'inst-002',
      name: 'Captain Kwesi Asante',
      email: 'instructor2@gafms.mil',
      role: 'instructor',
      status: 'active',
      taughtCourses: ['course-003'],
    },
  },
  instructor3: {
    email: 'instructor3@gafms.mil',
    password: 'inst123',
    user: {
      id: 'inst-003',
      name: 'Lieutenant Ama Adjei',
      email: 'instructor3@gafms.mil',
      role: 'instructor',
      status: 'active',
      taughtCourses: ['course-004', 'course-005'],
    },
  },
  student1: {
    email: 'student1@gafms.mil',
    password: 'stud123',
    user: {
      id: 'student-001',
      name: 'Cadet Nana Boateng',
      email: 'student1@gafms.mil',
      role: 'student',
      status: 'active',
      enrolledCourses: ['course-001', 'course-002'],
    },
  },
  student2: {
    email: 'student2@gafms.mil',
    password: 'stud123',
    user: {
      id: 'student-002',
      name: 'Cadet Yaa Kufuor',
      email: 'student2@gafms.mil',
      role: 'student',
      status: 'active',
      enrolledCourses: ['course-001', 'course-003'],
    },
  },
  student3: {
    email: 'student3@gafms.mil',
    password: 'stud123',
    user: {
      id: 'student-003',
      name: 'Cadet Kofi Mensah',
      email: 'student3@gafms.mil',
      role: 'student',
      status: 'active',
      enrolledCourses: ['course-002', 'course-004'],
    },
  },
  student4: {
    email: 'student4@gafms.mil',
    password: 'stud123',
    user: {
      id: 'student-004',
      name: 'Cadet Abena Anane',
      email: 'student4@gafms.mil',
      role: 'student',
      status: 'active',
      enrolledCourses: ['course-003', 'course-005'],
    },
  },
  student5: {
    email: 'student5@gafms.mil',
    password: 'stud123',
    user: {
      id: 'student-005',
      name: 'Cadet Kweku Nyarko',
      email: 'student5@gafms.mil',
      role: 'student',
      status: 'active',
      enrolledCourses: ['course-001', 'course-004', 'course-005'],
    },
  },
};

// Validate credentials
export function validateCredentials(
  email: string,
  password: string,
): User | null {
  for (const demoUser of Object.values(DEMO_USERS)) {
    if (demoUser.email === email && demoUser.password === password) {
      return demoUser.user;
    }
  }
  return null;
}

// Get user by ID
export function getUserById(userId: string): User | null {
  for (const demoUser of Object.values(DEMO_USERS)) {
    if (demoUser.user.id === userId) {
      return demoUser.user;
    }
  }
  return null;
}

// Get all demo users for admin panel
export function getAllDemoUsers(): User[] {
  return Object.values(DEMO_USERS).map(d => d.user);
}

// Get users by role
export function getUsersByRole(role: UserRole): User[] {
  return Object.values(DEMO_USERS)
    .filter(d => d.user.role === role)
    .map(d => d.user);
}

// Check if user has permission for route
export function canAccessRoute(user: User | null, route: string): boolean {
  if (!user) return false;

  const adminRoutes = [
    '/dashboard',
    '/courses',
    '/users',
    '/analytics',
    '/reports',
    '/settings',
  ];
  const instructorRoutes = [
    '/dashboard',
    '/courses',
    '/practicals',
    '/submissions',
    '/grades',
    '/analytics',
    '/students',
  ];
  const studentRoutes = [
    '/dashboard',
    '/courses',
    '/practicals',
    '/submissions',
    '/grades',
    '/profile',
  ];

  if (user.role === 'admin') return true;
  if (user.role === 'instructor') {
    return instructorRoutes.some(r => route.startsWith(r));
  }
  if (user.role === 'student') {
    return studentRoutes.some(r => route.startsWith(r));
  }

  return false;
}
