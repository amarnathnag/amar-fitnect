import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Save, Bell, Mail, Smartphone, MessageSquare } from 'lucide-react';
import { ProfileData } from '@/types/auth';

interface EnhancedNotificationsSectionProps {
  profileData: ProfileData | null;
  onSave: (data: Partial<ProfileData>) => Promise<void>;
}

const EnhancedNotificationsSection: React.FC<EnhancedNotificationsSectionProps> = ({ 
  profileData, 
  onSave 
}) => {
  const [notificationSettings, setNotificationSettings] = useState({
    email: profileData?.notification_preferences?.email ?? true,
    push: profileData?.notification_preferences?.push ?? true,
    sms: profileData?.notification_preferences?.sms ?? false
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (profileData?.notification_preferences) {
      setNotificationSettings({
        email: profileData.notification_preferences.email ?? true,
        push: profileData.notification_preferences.push ?? true,
        sms: profileData.notification_preferences.sms ?? false
      });
    }
  }, [profileData]);

  const handleNotificationChange = (type: string, value: boolean) => {
    setNotificationSettings(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await onSave({
        notification_preferences: notificationSettings
      });
    } catch (error) {
      console.error('Error saving notification preferences:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Mock recent notifications for demo
  const recentNotifications = [
    {
      id: '1',
      type: 'order' as const,
      title: 'Order Confirmed',
      message: 'Your health supplement order has been confirmed.',
      time: '2 hours ago',
      read: false
    },
    {
      id: '2',
      type: 'reminder' as const,
      title: 'Workout Reminder',
      message: 'Time for your evening workout session!',
      time: '1 day ago',
      read: true
    },
    {
      id: '3',
      type: 'achievement' as const,
      title: 'Goal Achieved!',
      message: 'Congratulations! You completed your weekly fitness goal.',
      time: '3 days ago',
      read: true
    }
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'order':
        return '📦';
      case 'reminder':
        return '⏰';
      case 'achievement':
        return '🎉';
      default:
        return '📢';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-notifications" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Notifications
                </Label>
                <p className="text-sm text-muted-foreground">
                  Receive updates about orders, workouts, and health tips via email
                </p>
              </div>
              <Switch
                id="email-notifications"
                checked={notificationSettings.email}
                onCheckedChange={(checked) => handleNotificationChange('email', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="push-notifications" className="flex items-center gap-2">
                  <Smartphone className="h-4 w-4" />
                  Push Notifications
                </Label>
                <p className="text-sm text-muted-foreground">
                  Get real-time updates and reminders on your device
                </p>
              </div>
              <Switch
                id="push-notifications"
                checked={notificationSettings.push}
                onCheckedChange={(checked) => handleNotificationChange('push', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="sms-notifications" className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  SMS Notifications
                </Label>
                <p className="text-sm text-muted-foreground">
                  Receive important updates via text messages
                </p>
              </div>
              <Switch
                id="sms-notifications"
                checked={notificationSettings.sms}
                onCheckedChange={(checked) => handleNotificationChange('sms', checked)}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button onClick={handleSave} disabled={isLoading}>
              <Save className="mr-2 h-4 w-4" /> 
              {isLoading ? 'Saving...' : 'Save Preferences'}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentNotifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`flex items-start gap-3 p-3 rounded-lg border ${
                  notification.read ? 'bg-muted/30' : 'bg-background border-primary/20'
                }`}
              >
                <div className="text-xl flex-shrink-0 mt-1">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-grow space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-sm">{notification.title}</h4>
                    {!notification.read && (
                      <Badge variant="secondary" className="text-xs">New</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{notification.message}</p>
                  <p className="text-xs text-muted-foreground">{notification.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedNotificationsSection;