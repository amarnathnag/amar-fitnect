
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import ProfileLayout from '@/components/profile/ProfileLayout';
import PersonalInfoTab from '@/components/profile/PersonalInfoTab';
import HealthDataTab from '@/components/profile/HealthDataTab';
import PreferencesTab from '@/components/profile/PreferencesTab';
import ProgressTab from '@/components/profile/ProgressTab';
import OrdersSection from '@/components/profile/OrdersSection';
import NotificationsSection from '@/components/profile/NotificationsSection';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/auth');
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        <ProfileLayout>
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
              <PersonalInfoTab />
            </TabsContent>
            
            <TabsContent value="health" className="space-y-6">
              <HealthDataTab />
            </TabsContent>
            
            <TabsContent value="progress" className="space-y-6">
              <ProgressTab />
            </TabsContent>
            
            <TabsContent value="orders" className="space-y-6">
              <OrdersSection />
            </TabsContent>
            
            <TabsContent value="notifications" className="space-y-6">
              <NotificationsSection />
            </TabsContent>
            
            <TabsContent value="preferences" className="space-y-6">
              <PreferencesTab />
            </TabsContent>
          </Tabs>
        </ProfileLayout>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
