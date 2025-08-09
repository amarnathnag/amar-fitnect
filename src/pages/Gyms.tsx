
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchGyms, fetchGymStats } from '@/services/gymService';
import { Gym } from '@/types/gym';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import GymSearchBar from '@/components/gyms/GymSearchBar';
import GymCard from '@/components/gyms/GymCard';
import { Button } from '@/components/ui/button';
import { Loader2, Building, Users, Dumbbell, Plus, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Gyms = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const pincodeQuery = searchParams.get('pincode') || '';
  
  const { data: gyms, isLoading, error } = useQuery({
    queryKey: ['gyms', searchQuery, pincodeQuery],
    queryFn: () => fetchGyms(searchQuery, pincodeQuery),
  });
  
  const { data: stats, isLoading: isStatsLoading } = useQuery({
    queryKey: ['gymStats'],
    queryFn: fetchGymStats,
  });
  
  const handleSearch = (search: string, pincode: string) => {
    setSearchParams({ search, pincode });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow pt-6 pb-16">
        <div className="container-custom mx-auto px-4">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          
          {/* Hero Section */}
          <div className="relative rounded-lg overflow-hidden mb-12">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70 z-10"></div>
            <div className="bg-gray-800 h-96">
              {/* Background image would go here */}
            </div>
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white z-20 px-4 text-center">
              <h1 className="text-3xl md:text-5xl font-bold mb-4">Find Your Perfect Fitness Partner</h1>
              <p className="text-lg md:text-xl mb-8 max-w-2xl">
                Discover gyms, trainers, and fitness centers near you. Start your fitness journey today!
              </p>
              <div className="w-full max-w-3xl">
                <GymSearchBar onSearch={handleSearch} />
              </div>
            </div>
          </div>
          
          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-lg shadow-sm p-6 flex items-center">
              <div className="rounded-full bg-primary/10 p-3 mr-4">
                <Building className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Gyms</p>
                <p className="text-2xl font-bold">
                  {isStatsLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : stats?.totalGyms || 0}
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6 flex items-center">
              <div className="rounded-full bg-primary/10 p-3 mr-4">
                <Dumbbell className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Trainers</p>
                <p className="text-2xl font-bold">
                  {isStatsLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : stats?.totalTrainers || 0}
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6 flex items-center">
              <div className="rounded-full bg-primary/10 p-3 mr-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Active Members</p>
                <p className="text-2xl font-bold">
                  {isStatsLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : stats?.totalMembers || 0}
                </p>
              </div>
            </div>
          </div>
          
          {/* Gyms List Section */}
          <div className="mb-8 flex justify-between items-center">
            <h2 className="text-2xl font-bold">
              {searchQuery || pincodeQuery 
                ? `Search Results ${gyms?.length ? `(${gyms.length})` : ''}`
                : 'Featured Gyms'
              }
            </h2>
            {user && (
              <Button asChild>
                <Link to="/gyms/register">
                  <Plus className="mr-2 h-4 w-4" /> Register Gym
                </Link>
              </Button>
            )}
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : error ? (
            <div className="bg-red-50 p-4 rounded-md text-red-800 text-center">
              Failed to load gyms. Please try again later.
            </div>
          ) : gyms?.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-500 mb-4">No gyms found matching your criteria</p>
              <Button onClick={() => setSearchParams({})}>View All Gyms</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gyms?.map((gym) => (
                <GymCard key={gym.id} gym={gym} />
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Gyms;
