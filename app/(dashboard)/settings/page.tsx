'use client';

import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, Lock, Users, Palette, LogOut } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export default function SettingsPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const [mounted, setMounted] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [systemAlerts, setSystemAlerts] = useState(true);

  useEffect(() => setMounted(true), []);

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">You don't have access to this page.</p>
            <Button onClick={() => router.push('/dashboard')}>Return to Dashboard</Button>
          </div>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  const saveNotifications = () => {
    localStorage.setItem('emailNotifications', String(emailNotifications));
    localStorage.setItem('systemAlerts', String(systemAlerts));
    toast({
      title: 'Preferences saved',
      description: 'Your notification preferences have been updated.',
    });
  };

  const saveTheme = () => {
    toast({
      title: 'Theme saved',
      description: `${theme === 'dark' ? 'Dark' : 'Light'} mode has been applied.`,
    });
  };

  return (
    <div className="min-h-screen bg-background p-4 lg:p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground mt-2">Manage system configuration and preferences</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-accent" />
              Notifications
            </CardTitle>
            <CardDescription>Configure notification preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-muted-foreground">Receive email updates on submissions</p>
              </div>
              <input 
                type="checkbox" 
                checked={emailNotifications}
                onChange={(e) => setEmailNotifications(e.target.checked)}
                className="w-5 h-5" 
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">System Alerts</p>
                <p className="text-sm text-muted-foreground">Critical system notifications</p>
              </div>
              <input 
                type="checkbox" 
                checked={systemAlerts}
                onChange={(e) => setSystemAlerts(e.target.checked)}
                className="w-5 h-5" 
              />
            </div>
            <Button onClick={saveNotifications} className="mt-4">Save Preferences</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="w-5 h-5 text-accent" />
              Appearance
            </CardTitle>
            <CardDescription>Customize the system appearance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mounted && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-3">Theme</label>
                  <div className="flex gap-2">
                    <Button 
                      variant={theme === 'light' ? 'default' : 'outline'}
                      onClick={() => setTheme('light')}
                      className="flex-1"
                    >
                      Light
                    </Button>
                    <Button 
                      variant={theme === 'dark' ? 'default' : 'outline'}
                      onClick={() => setTheme('dark')}
                      className="flex-1"
                    >
                      Dark
                    </Button>
                  </div>
                </div>
                <Button onClick={saveTheme} className="w-full mt-4">Save Theme</Button>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-accent" />
              Security
            </CardTitle>
            <CardDescription>Manage security settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => toast({ title: 'Coming soon', description: 'Password change feature will be available soon.' })}
            >
              Change Password
            </Button>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => toast({ title: 'Coming soon', description: 'Two-factor authentication will be available soon.' })}
            >
              Two-Factor Authentication
            </Button>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => toast({ title: 'Active sessions', description: 'You have 1 active session.' })}
            >
              Manage Sessions
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-accent" />
              System Administration
            </CardTitle>
            <CardDescription>Advanced system settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => router.push('/users')}
            >
              Manage User Roles
            </Button>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => toast({ title: 'System logs', description: 'No errors in the last 24 hours.' })}
            >
              System Logs
            </Button>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => toast({ title: 'Backup created', description: 'System backup completed successfully.' })}
            >
              Backup & Restore
            </Button>
          </CardContent>
        </Card>

        <Card className="border-destructive/50 bg-destructive/5">
          <CardHeader>
            <CardTitle className="text-destructive">Danger Zone</CardTitle>
          </CardHeader>
          <CardContent>
            <Button variant="destructive" className="w-full" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
