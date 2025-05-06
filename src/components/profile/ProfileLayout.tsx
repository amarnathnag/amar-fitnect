
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Settings, ChartLineUp, Calendar } from 'lucide-react';

interface ProfileLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const ProfileLayout: React.FC<ProfileLayoutProps> = ({ children, activeTab, setActiveTab }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow py-12">
        <div className="container-custom max-w-5xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">My Profile</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Manage your personal information, preferences, and track your progress.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            <div className="border-b border-gray-200 dark:border-gray-700 p-4">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-4 md:w-[400px]">
                  <TabsTrigger value="personal" className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span className="hidden md:inline">Personal Info</span>
                    <span className="md:hidden">Info</span>
                  </TabsTrigger>
                  <TabsTrigger value="preferences" className="flex items-center gap-1">
                    <Settings className="h-4 w-4" />
                    <span className="hidden md:inline">Preferences</span>
                    <span className="md:hidden">Prefs</span>
                  </TabsTrigger>
                  <TabsTrigger value="progress" className="flex items-center gap-1">
                    <ChartLineUp className="h-4 w-4" />
                    <span className="hidden md:inline">Progress</span>
                    <span className="md:hidden">Prog</span>
                  </TabsTrigger>
                  <TabsTrigger value="appointments" className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span className="hidden md:inline">Appointments</span>
                    <span className="md:hidden">Appts</span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            <div className="p-6">
              {children}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProfileLayout;
