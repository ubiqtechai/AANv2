import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Bell, Lock, Eye, Moon } from 'lucide-react';
import { updateUserSettings } from '@/services/dashboardService';

export default function Settings() {
  const { userData } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      desktop: true
    },
    privacy: {
      profileVisibility: 'network',
      showEmail: true,
      showPhone: false
    },
    theme: {
      mode: 'light',
      color: 'default'
    }
  });

  const handleSettingChange = async (section: string, setting: string, value: any) => {
    try {
      setLoading(true);
      const newSettings = {
        ...settings,
        [section]: {
          ...settings[section as keyof typeof settings],
          [setting]: value
        }
      };
      
      setSettings(newSettings);
      await updateUserSettings(userData!.id, newSettings);
    } catch (err) {
      console.error('Error updating settings:', err);
      setError('Failed to update settings');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="mt-2 text-gray-600">Manage your account settings and preferences</p>
      </header>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          {error}
        </div>
      )}

      <div className="space-y-6">
        {/* Notifications */}
        <Card>
          <div className="p-6">
            <div className="flex items-center">
              <Bell className="h-5 w-5 text-gray-400" />
              <h3 className="ml-2 text-lg font-medium text-gray-900">Notifications</h3>
            </div>
            <p className="mt-1 text-sm text-gray-500">Choose how you want to be notified</p>

            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-700">Email Notifications</label>
                  <p className="text-sm text-gray-500">Receive notifications via email</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.notifications.email}
                  onChange={(e) => handleSettingChange('notifications', 'email', e.target.checked)}
                  className="form-checkbox"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-700">Push Notifications</label>
                  <p className="text-sm text-gray-500">Receive push notifications</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.notifications.push}
                  onChange={(e) => handleSettingChange('notifications', 'push', e.target.checked)}
                  className="form-checkbox"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-700">Desktop Notifications</label>
                  <p className="text-sm text-gray-500">Show desktop notifications</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.notifications.desktop}
                  onChange={(e) => handleSettingChange('notifications', 'desktop', e.target.checked)}
                  className="form-checkbox"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Privacy */}
        <Card>
          <div className="p-6">
            <div className="flex items-center">
              <Eye className="h-5 w-5 text-gray-400" />
              <h3 className="ml-2 text-lg font-medium text-gray-900">Privacy</h3>
            </div>
            <p className="mt-1 text-sm text-gray-500">Manage your privacy settings</p>

            <div className="mt-6 space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Profile Visibility</label>
                <select
                  value={settings.privacy.profileVisibility}
                  onChange={(e) => handleSettingChange('privacy', 'profileVisibility', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500"
                >
                  <option value="public">Public</option>
                  <option value="network">Network Only</option>
                  <option value="private">Private</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-700">Show Email</label>
                  <p className="text-sm text-gray-500">Display your email to other users</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.privacy.showEmail}
                  onChange={(e) => handleSettingChange('privacy', 'showEmail', e.target.checked)}
                  className="form-checkbox"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-700">Show Phone Number</label>
                  <p className="text-sm text-gray-500">Display your phone number to other users</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.privacy.showPhone}
                  onChange={(e) => handleSettingChange('privacy', 'showPhone', e.target.checked)}
                  className="form-checkbox"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Security */}
        <Card>
          <div className="p-6">
            <div className="flex items-center">
              <Lock className="h-5 w-5 text-gray-400" />
              <h3 className="ml-2 text-lg font-medium text-gray-900">Security</h3>
            </div>
            <p className="mt-1 text-sm text-gray-500">Manage your security settings</p>

            <div className="mt-6 space-y-4">
              <Button variant="outline">
                Change Password
              </Button>

              <Button variant="outline">
                Enable Two-Factor Authentication
              </Button>
            </div>
          </div>
        </Card>

        {/* Theme */}
        <Card>
          <div className="p-6">
            <div className="flex items-center">
              <Moon className="h-5 w-5 text-gray-400" />
              <h3 className="ml-2 text-lg font-medium text-gray-900">Theme</h3>
            </div>
            <p className="mt-1 text-sm text-gray-500">Customize your interface</p>

            <div className="mt-6">
              <label className="text-sm font-medium text-gray-700">Theme Mode</label>
              <select
                value={settings.theme.mode}
                onChange={(e) => handleSettingChange('theme', 'mode', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System</option>
              </select>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}