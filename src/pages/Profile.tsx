
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import PersonalInfoTab from '@/components/profile/PersonalInfoTab';
import HealthDataTab from '@/components/profile/HealthDataTab';
import PreferencesTab from '@/components/profile/PreferencesTab';
import ProgressTab from '@/components/profile/ProgressTab';
import OrdersSection from '@/components/profile/OrdersSection';
import NotificationsSection from '@/components/profile/NotificationsSection';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [userData, setUserData] = useState({
    personal: {
      name: user?.name || '',
      email: user?.email || '',
      age: 25,
      gender: 'male',
      height: 170,
      weight: 70,
      targetWeight: 65
    },
    preferences: {
      dietType: 'vegetarian',
      goal: 'weightLoss',
      allergies: '',
      medicalConditions: '',
      activityLevel: 'moderate'
    },
    progress: {
      startingWeight: 75,
      currentWeight: 70,
      weightGoal: 65,
      startDate: '2024-01-01',
      workoutsCompleted: 25,
      streakDays: 7
    }
  });

  if (!user) {
    navigate('/auth');
    return null;
  }

  const handlePersonalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      personal: {
        ...prev.personal,
        [name]: value
      }
    }));
  };

  const handlePreferencesChange = (name: string, value: string) => {
    setUserData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [name]: value
      }
    }));
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      progress: {
        ...prev.progress,
        [name]: parseFloat(value) || 0
      }
    }));
  };

  const saveChanges = () => {
    toast({
      title: "Changes Saved",
      description: "Your profile has been updated successfully.",
    });
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

          <Tabs defaultValue="personal" className="space-y-6">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="health">Health Data</TabsTrigger>
              <TabsTrigger value="progress">Progress</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
            </TabsList>
            
            <TabsContent value="personal" className="space-y-6">
              <PersonalInfoTab 
                userData={userData}
                handlePersonalChange={handlePersonalChange}
                saveChanges={saveChanges}
              />
            </TabsContent>
            
            <TabsContent value="health" className="space-y-6">
              <HealthDataTab />
            </TabsContent>
            
            <TabsContent value="progress" className="space-y-6">
              <ProgressTab 
                userData={userData}
                handleProgressChange={handleProgressChange}
                saveChanges={saveChanges}
              />
            </TabsContent>
            
            <TabsContent value="orders" className="space-y-6">
              <OrdersSection />
            </TabsContent>
            
            <TabsContent value="notifications" className="space-y-6">
              <NotificationsSection />
            </TabsContent>
            
            <TabsContent value="preferences" className="space-y-6">
              <PreferencesTab 
                userData={userData}
                handlePreferencesChange={handlePreferencesChange}
                saveChanges={saveChanges}
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
