'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import Image from 'next/image';

export function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      router.push('/dashboard');
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Demo credentials helper
  const demoCredentials = [
    { email: 'admin@gafms.mil', password: 'admin123', role: 'Admin' },
    { email: 'instructor1@gafms.mil', password: 'inst123', role: 'Instructor' },
    { email: 'student1@gafms.mil', password: 'stud123', role: 'Student' },
  ];

  const fillDemo = (demoEmail: string, demoPassword: string) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 flex flex-col items-center justify-center p-3 sm:p-4">
      <div className="w-full max-w-md">
        <Card className="border-border/50 backdrop-blur-sm">
          <CardHeader className="space-y-2 p-4 sm:p-6">
            <div className="flex items-center justify-center mb-3 sm:mb-4">
              <Image 
                src="/gafms-logo.png" 
                alt="GAFMS Logo" 
                width={60} 
                height={60}
                className="w-14 sm:w-16 h-14 sm:h-16"
              />
            </div>
            <CardTitle className="text-xl sm:text-2xl text-center">GAFMS MusicLearn</CardTitle>
            <CardDescription className="text-center text-xs sm:text-sm">
              Ghana Armed Forces Music School
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6">
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              {error && (
                <Alert variant="destructive" className="text-xs sm:text-sm">
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-1.5 sm:space-y-2">
                <Label htmlFor="email" className="text-xs sm:text-sm">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@gafms.mil"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  className="bg-input border-border/50 text-sm"
                />
              </div>

              <div className="space-y-1.5 sm:space-y-2">
                <Label htmlFor="password" className="text-xs sm:text-sm">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  className="bg-input border-border/50 text-sm"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-sm"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border/30"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Demo Credentials</span>
              </div>
            </div>

            <div className="space-y-2">
              {demoCredentials.map((cred) => (
                <button
                  key={cred.email}
                  onClick={() => fillDemo(cred.email, cred.password)}
                  className="w-full p-2 sm:p-3 text-left border border-border/30 rounded-lg hover:bg-secondary/50 transition-colors text-xs sm:text-sm group"
                >
                  <div className="font-medium text-foreground group-hover:text-accent">
                    {cred.role}
                  </div>
                  <div className="text-muted-foreground text-xs truncate">{cred.email}</div>
                </button>
              ))}
            </div>

            <div className="p-2 sm:p-3 rounded-lg bg-muted/30 border border-border/30">
              <p className="text-xs text-muted-foreground">
                <span className="font-semibold">Password:</span> Same for all demo accounts
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-3 sm:mt-4 text-center text-xs text-muted-foreground px-4">
          <p>Built by <span className="font-semibold text-accent">Arthurite Integrated</span></p>
          <p className="mt-1">&copy; {new Date().getFullYear()} Ghana Armed Forces. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
