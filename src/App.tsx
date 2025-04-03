
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import BmiCalculator from "./pages/BmiCalculator";
import DietPlans from "./pages/DietPlans";
import Workouts from "./pages/Workouts";
import DiseaseManagement from "./pages/DiseaseManagement";
import DiseaseDetail from "./pages/DiseaseDetail";
import DailyRoutine from "./pages/DailyRoutine";
import Profile from "./pages/Profile";
import Community from "./pages/Community";
import DoctorConsultation from "./pages/DoctorConsultation";
import PremiumAi from "./pages/PremiumAi";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Contact from "./pages/Contact";
import WomensHealth from "./pages/WomensHealth";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Create a client
const queryClient = new QueryClient();

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/bmi-calculator" element={<BmiCalculator />} />
    <Route path="/diet-plans" element={<DietPlans />} />
    <Route path="/workouts" element={<Workouts />} />
    <Route path="/disease-management" element={<DiseaseManagement />} />
    <Route path="/disease-management/:diseaseId" element={<DiseaseDetail />} />
    <Route path="/womens-health" element={<WomensHealth />} />
    <Route path="/daily-routine" element={<DailyRoutine />} />
    <Route path="/doctor-consultation" element={<DoctorConsultation />} />
    <Route path="/premium-ai" element={<PremiumAi />} />
    <Route 
      path="/profile" 
      element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      } 
    />
    <Route path="/community" element={<Community />} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} />
    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
