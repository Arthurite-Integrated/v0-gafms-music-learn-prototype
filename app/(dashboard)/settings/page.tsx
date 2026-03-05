'use client';

import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, Lock, Users, Palette, LogOut } from 'lucide-react';

export default function SettingsPage() {
  const { user, logout } = useAuth();
  const router = useRouter();

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
    router.push('/login');
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
              <input type="checkbox" defaultChecked className="w-5 h-5" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">System Alerts</p>
                <p className="text-sm text-muted-foreground">Critical system notifications</p>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5" />
            </div>
            <Button className="mt-4">Save Preferences</Button>
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
            <div>
              <label className="block text-sm font-medium mb-3">Theme</label>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">Light</Button>
                <Button className="flex-1 bg-primary">Dark</Button>
              </div>
            </div>
            <Button className="w-full mt-4">Save Theme</Button>
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
            <Button variant="outline" className="w-full">Change Password</Button>
            <Button variant="outline" className="w-full">Two-Factor Authentication</Button>
            <Button variant="outline" className="w-full">Manage Sessions</Button>
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
            <Button variant="outline" className="w-full">Manage User Roles</Button>
            <Button variant="outline" className="w-full">System Logs</Button>
            <Button variant="outline" className="w-full">Backup & Restore</Button>
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
