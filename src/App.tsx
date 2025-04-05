
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
import WomensHealth from '@/pages/WomensHealth';
import DailyRoutine from '@/pages/DailyRoutine';
import Community from '@/pages/Community';
import DoctorConsultation from '@/pages/DoctorConsultation';
import Chat from '@/pages/Chat';
import PremiumAi from '@/pages/PremiumAi';
import Profile from '@/pages/Profile';
import NotFound from '@/pages/NotFound';
import { AuthProvider } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';

// Language Context
import { LanguageProvider } from '@/contexts/LanguageContext';

import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <QueryClientProvider client={queryClient}>
        <LanguageProvider>
          <AuthProvider>
            <Router>
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
                <Route path="/womens-health" element={<WomensHealth />} />
                <Route path="/daily-routine" element={<DailyRoutine />} />
                <Route path="/community" element={<Community />} />
                <Route path="/doctor-consultation" element={<DoctorConsultation />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/premium-ai" element={<PremiumAi />} />
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
            </Router>
          </AuthProvider>
        </LanguageProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
