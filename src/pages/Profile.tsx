
import React, { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/contexts/AuthContext';

// Import refactored components
import ProfileLayout from '@/components/profile/ProfileLayout';
import PersonalInfoTab from '@/components/profile/PersonalInfoTab';
import PreferencesTab from '@/components/profile/PreferencesTab';
import ProgressTab from '@/components/profile/ProgressTab';
import HealthDataTab from '@/components/profile/HealthDataTab';
import UserAppointments from '@/components/doctor/UserAppointments';

const Profile = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("personal");
  
  // Mock user data - in a real app this would come from an API or state management
  const [userData, setUserData] = useState({
    personal: {
      name: user?.name || "",
      email: user?.email || "",
      age: 28,
      gender: user?.gender || "male",
      height: 175,
      weight: 70,
      targetWeight: 65,
    },
    preferences: {
      dietType: "vegetarian",
      goal: "weightLoss",
      allergies: "None",
      medicalConditions: "None",
      activityLevel: "moderate",
    },
    progress: {
      startingWeight: 75,
      currentWeight: 70,
      weightGoal: 65,
      startDate: "2023-08-15",
      workoutsCompleted: 24,
      streakDays: 14,
    }
  });

  // Update user data when auth user changes
  useEffect(() => {
    if (user) {
      setUserData(prevData => ({
        ...prevData,
        personal: {
          ...prevData.personal,
          name: user.name || prevData.personal.name,
          email: user.email,
          gender: user.gender || prevData.personal.gender
        }
      }));
    }
  }, [user]);

  const handlePersonalChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      personal: {
        ...userData.personal,
        [name]: value
      }
    });
  };

  const handlePreferencesChange = (name, value) => {
    setUserData({
      ...userData,
      preferences: {
        ...userData.preferences,
        [name]: value
      }
    });
  };

  const handleProgressChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      progress: {
        ...userData.progress,
        [name]: value
      }
    });
  };

  const saveChanges = () => {
    // In a real app, this would send data to an API
    // For now, we'll just update localStorage with the name
    if (userData.personal.name) {
      localStorage.setItem("userName", userData.personal.name);
    }
    
    toast({
      title: "Changes saved!",
      description: "Your profile has been updated successfully.",
    });
  };

  return (
    <ProfileLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      {activeTab === "personal" && (
        <PersonalInfoTab 
          userData={userData} 
          handlePersonalChange={handlePersonalChange} 
          saveChanges={saveChanges} 
        />
      )}
      
      {activeTab === "preferences" && (
        <PreferencesTab 
          userData={userData} 
          handlePreferencesChange={handlePreferencesChange} 
          saveChanges={saveChanges} 
        />
      )}
      
      {activeTab === "progress" && (
        <ProgressTab 
          userData={userData} 
          handleProgressChange={handleProgressChange} 
          saveChanges={saveChanges} 
        />
      )}

      {activeTab === "health-data" && (
        <HealthDataTab />
      )}

      {activeTab === "appointments" && (
        <div className="space-y-6">
          <UserAppointments />
        </div>
      )}
    </ProfileLayout>
  );
};

export default Profile;
