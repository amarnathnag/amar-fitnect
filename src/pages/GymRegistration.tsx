
import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import GymForm from '@/components/gyms/GymForm';
import { Gym } from '@/types/gym';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';

const GymRegistration = () => {
  const navigate = useNavigate();
  
  const handleSuccess = (gym: Gym) => {
    navigate(`/gyms/${gym.id}?registered=true`);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col">
        <NavBar />
        
        <main className="flex-grow pt-6 pb-16">
          <div className="container-custom mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold">Register Your Gym</h1>
                <p className="text-gray-600 mt-2">
                  Fill in the details below to list your gym on our platform
                </p>
              </div>
              
              <GymForm onSuccess={handleSuccess} />
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default GymRegistration;
