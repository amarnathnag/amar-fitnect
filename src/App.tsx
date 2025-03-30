
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

// Create a client
const queryClient = new QueryClient();

const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/bmi-calculator" element={<BmiCalculator />} />
            <Route path="/diet-plans" element={<DietPlans />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/disease-management" element={<DiseaseManagement />} />
            <Route path="/disease-management/:diseaseId" element={<DiseaseDetail />} />
            <Route path="/daily-routine" element={<DailyRoutine />} />
            <Route path="/doctor-consultation" element={<DoctorConsultation />} />
            <Route path="/premium-ai" element={<PremiumAi />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/community" element={<Community />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
