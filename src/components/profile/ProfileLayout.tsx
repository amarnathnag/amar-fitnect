
import React from 'react';
import { User, LogOut } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/contexts/AuthContext';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

interface ProfileLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const ProfileLayout: React.FC<ProfileLayoutProps> = ({ children, activeTab, setActiveTab }) => {
  const { toast } = useToast();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow py-10">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Sidebar */}
            <div className="w-full md:w-1/4">
              <Card className="sticky top-20">
                <CardHeader className="pb-2">
                  <div className="flex justify-center mb-4">
                    <div className="h-24 w-24 rounded-full bg-health-light flex items-center justify-center">
                      <User className="h-12 w-12 text-health-primary" />
                    </div>
                  </div>
                  <CardTitle className="text-center">{user?.name}</CardTitle>
                  <CardDescription className="text-center">{user?.email}</CardDescription>
                </CardHeader>
                <CardContent className="px-2">
                  <div className="space-y-1">
                    <Button 
                      variant={activeTab === "personal" ? "default" : "ghost"} 
                      className="w-full justify-start" 
                      onClick={() => setActiveTab("personal")}
                    >
                      <User className="mr-2 h-4 w-4" /> Personal Info
                    </Button>
                    <Button 
                      variant={activeTab === "preferences" ? "default" : "ghost"} 
                      className="w-full justify-start" 
                      onClick={() => setActiveTab("preferences")}
                    >
                      <User className="mr-2 h-4 w-4" /> Preferences
                    </Button>
                    <Button 
                      variant={activeTab === "progress" ? "default" : "ghost"} 
                      className="w-full justify-start" 
                      onClick={() => setActiveTab("progress")}
                    >
                      <User className="mr-2 h-4 w-4" /> Progress
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start text-red-500 hover:text-red-700 hover:bg-red-50 mt-4" 
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-2 h-4 w-4" /> Logout
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              <Card>
                <CardHeader>
                  <CardTitle>{
                    activeTab === "personal" ? "Personal Information" : 
                    activeTab === "preferences" ? "Health Preferences" : 
                    "Progress Tracking"
                  }</CardTitle>
                  <CardDescription>{
                    activeTab === "personal" ? "Update your personal details" : 
                    activeTab === "preferences" ? "Set your health and diet preferences" : 
                    "Track your health and fitness journey"
                  }</CardDescription>
                </CardHeader>
                <CardContent>
                  {children}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProfileLayout;
