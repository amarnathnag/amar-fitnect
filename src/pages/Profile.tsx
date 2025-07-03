import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import PersonalInfoTab from '@/components/profile/PersonalInfoTab';
import HealthDataTab from '@/components/profile/HealthDataTab';
import EnhancedPreferencesTab from '@/components/profile/EnhancedPreferencesTab';
import EnhancedProgressTab from '@/components/profile/EnhancedProgressTab';
import OrdersSection from '@/components/profile/OrdersSection';
import EnhancedNotificationsSection from '@/components/profile/EnhancedNotificationsSection';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useSearchParams } from 'react-router-dom';
import { User, Settings, Heart, TrendingUp, Package, Bell } from 'lucide-react';

const Profile = () => {
  const { user, profileData, updateProfile, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Get tab from URL params
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get('tab') || 'personal';

  useEffect(() => {
    if (!user && !isLoading) {
      navigate('/auth');
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-muted-foreground">Loading profile...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const calculateAge = (dateOfBirth: string | null): number => {
    if (!dateOfBirth) return 0;
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleSaveProfile = async (data: any) => {
    try {
      await updateProfile(data);
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error) {
      console.error('Error saving profile:', error);
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        <div className="container-custom py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Profile Settings</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your account settings and preferences
            </p>
          </div>

          <Tabs defaultValue={defaultTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="personal" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Personal</span>
              </TabsTrigger>
              <TabsTrigger value="health" className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                <span className="hidden sm:inline">Health Data</span>
              </TabsTrigger>
              <TabsTrigger value="progress" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                <span className="hidden sm:inline">Progress</span>
              </TabsTrigger>
              <TabsTrigger value="orders" className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                <span className="hidden sm:inline">Orders</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                <span className="hidden sm:inline">Notifications</span>
              </TabsTrigger>
              <TabsTrigger value="preferences" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <span className="hidden sm:inline">Preferences</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="personal" className="space-y-6">
              <PersonalInfoTab 
                user={user}
                profileData={profileData}
                onSave={handleSaveProfile}
                calculateAge={calculateAge}
              />
            </TabsContent>
            
            <TabsContent value="health" className="space-y-6">
              <HealthDataTab />
            </TabsContent>
            
            <TabsContent value="progress" className="space-y-6">
              <EnhancedProgressTab 
                profileData={profileData}
                onSave={handleSaveProfile}
              />
            </TabsContent>
            
            <TabsContent value="orders" className="space-y-6">
              <OrdersSection />
            </TabsContent>
            
            <TabsContent value="notifications" className="space-y-6">
              <EnhancedNotificationsSection 
                profileData={profileData}
                onSave={handleSaveProfile}
              />
            </TabsContent>
            
            <TabsContent value="preferences" className="space-y-6">
              <EnhancedPreferencesTab 
                profileData={profileData}
                onSave={handleSaveProfile}
              />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;