import { redirect } from 'next/navigation';
import { LoginForm } from '@/components/login-form';
import { AuthContext } from '@/lib/auth-context';

export const metadata = {
  title: 'Login - GAFMS MusicLearn',
  description: 'Sign in to GAFMS MusicLearn',
};

export default function LoginPage() {
  return <LoginForm />;
}
