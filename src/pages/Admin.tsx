
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminGyms from '@/components/admin/AdminGyms';
import AdminDoctors from '@/components/admin/AdminDoctors';
import AdminAppointments from '@/components/admin/AdminAppointments';
import AdminProducts from '@/components/admin/AdminProducts';
import { Loader2 } from 'lucide-react';

const Admin = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('products');
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Check if user is admin
    if (!user?.isAdmin) {
      navigate('/auth');
    } else {
      setLoading(false);
    }
  }, [user, navigate]);
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <div className="flex-grow flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow py-8">
        <div className="container-custom mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-600 mt-2">Manage your health application content and users</p>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="gyms">Gyms</TabsTrigger>
              <TabsTrigger value="doctors">Doctors</TabsTrigger>
              <TabsTrigger value="appointments">Appointments</TabsTrigger>
            </TabsList>
            
            <TabsContent value="products" className="space-y-4">
              <AdminProducts />
            </TabsContent>
            
            <TabsContent value="gyms" className="space-y-4">
              <AdminGyms />
            </TabsContent>
            
            <TabsContent value="doctors" className="space-y-4">
              <AdminDoctors />
            </TabsContent>
            
            <TabsContent value="appointments" className="space-y-4">
              <AdminAppointments />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
