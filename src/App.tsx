
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/toaster';

// Pages
import Index from '@/pages/Index';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import Auth from '@/pages/Auth';
import BmiCalculator from '@/pages/BmiCalculator';
import DietPlans from '@/pages/DietPlans';
import DiseaseManagement from '@/pages/DiseaseManagement';
import DiseaseDetail from '@/pages/DiseaseDetail';
import Workouts from '@/pages/Workouts';
import WorkoutDetail from '@/pages/WorkoutDetail';
import ExerciseDetails from '@/pages/ExerciseDetails';
import WomensHealth from '@/pages/WomensHealth';
import DailyRoutine from '@/pages/DailyRoutine';
import Community from '@/pages/Community';
import DoctorConsultation from '@/pages/DoctorConsultation';
import Chat from '@/pages/Chat';
import PremiumAi from '@/pages/PremiumAi';
import Subscription from '@/pages/Subscription';
import PremiumPayment from '@/pages/PremiumPayment';
import PremiumUnlocked from '@/pages/PremiumUnlocked';
import Blog from '@/pages/Blog';
import Profile from '@/pages/Profile';
import ProfileSetup from '@/pages/ProfileSetup';
import NotFound from '@/pages/NotFound';

// Gym Section Pages
import Gyms from '@/pages/Gyms';
import GymDetail from '@/pages/GymDetail';
import GymRegistration from '@/pages/GymRegistration';
import Jobs from '@/pages/Jobs';
import JobDetails from '@/pages/JobDetails';
import JobApplication from '@/pages/JobApplication';
import JobApplicationSuccess from '@/pages/JobApplicationSuccess';

import { AuthProvider } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';

// Language Context
import { LanguageProvider } from '@/contexts/LanguageContext';

import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <Router>
      <ThemeProvider attribute="class" defaultTheme="light">
        <QueryClientProvider client={queryClient}>
          <LanguageProvider>
            <AuthProvider>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/bmi-calculator" element={<BmiCalculator />} />
                <Route path="/diet-plans" element={<DietPlans />} />
                <Route path="/disease-management" element={<DiseaseManagement />} />
                <Route path="/disease-management/:diseaseId" element={<DiseaseDetail />} />
                <Route path="/workouts" element={<Workouts />} />
                <Route path="/workout-detail" element={<WorkoutDetail />} />
                <Route path="/exercise-details" element={<ExerciseDetails />} />
                <Route path="/womens-health" element={<WomensHealth />} />
                <Route path="/daily-routine" element={<DailyRoutine />} />
                <Route path="/community" element={<Community />} />
                
                {/* Gym Section Routes */}
                <Route path="/gyms" element={<Gyms />} />
                <Route path="/gyms/:id" element={<GymDetail />} />
                <Route 
                  path="/gyms/register" 
                  element={
                    <ProtectedRoute>
                      <GymRegistration />
                    </ProtectedRoute>
                  } 
                />
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/jobs/:id" element={<JobDetails />} />
                <Route 
                  path="/jobs/:id/apply" 
                  element={<JobApplication />} 
                />
                <Route path="/jobs/application-success" element={<JobApplicationSuccess />} />
                
                {/* Premium routes that require authentication and premium status */}
                <Route 
                  path="/doctor-consultation" 
                  element={
                    <ProtectedRoute requiresPremium>
                      <DoctorConsultation />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/chat" 
                  element={
                    <ProtectedRoute>
                      <Chat />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/premium-ai" 
                  element={
                    <ProtectedRoute requiresPremium>
                      <PremiumAi />
                    </ProtectedRoute>
                  } 
                />
                
                <Route path="/subscription" element={<Subscription />} />
                <Route 
                  path="/premium-payment" 
                  element={
                    <ProtectedRoute>
                      <PremiumPayment />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/premium-unlocked" 
                  element={
                    <ProtectedRoute>
                      <PremiumUnlocked />
                    </ProtectedRoute>
                  } 
                />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:postId" element={<Blog />} />
                <Route 
                  path="/profile-setup" 
                  element={
                    <ProtectedRoute>
                      <ProfileSetup />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/profile" 
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  } 
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Toaster />
            </AuthProvider>
          </LanguageProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
