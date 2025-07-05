
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import ProtectedRoute from "@/components/ProtectedRoute";

// Import all pages
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import ProfileSetup from "./pages/ProfileSetup";
import Workouts from "./pages/Workouts";
import WorkoutDetail from "./pages/WorkoutDetail";
import ExerciseDetails from "./pages/ExerciseDetails";
import WomensHealth from "./pages/WomensHealth";
import DietPlans from "./pages/DietPlans";
import BmiCalculator from "./pages/BmiCalculator";
import DoctorConsultation from "./pages/DoctorConsultation";
import Gyms from "./pages/Gyms";
import GymDetail from "./pages/GymDetail";
import GymRegistration from "./pages/GymRegistration";
import GymBookTrial from "./pages/GymBookTrial";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import JobApplication from "./pages/JobApplication";
import JobApplicationSuccess from "./pages/JobApplicationSuccess";
import Community from "./pages/Community";
import Blog from "./pages/Blog";
import Chat from "./pages/Chat";
import DiseaseManagement from "./pages/DiseaseManagement";
import DiseaseDetail from "./pages/DiseaseDetail";
import DailyRoutine from "./pages/DailyRoutine";
import Marketplace from "./pages/Marketplace";
import ProductDetail from '@/pages/ProductDetail';
import Checkout from "./pages/Checkout";
import Subscription from "./pages/Subscription";
import PremiumAi from "./pages/PremiumAi";
import PremiumPayment from "./pages/PremiumPayment";
import PremiumUnlocked from "./pages/PremiumUnlocked";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function App() {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <LanguageProvider>
          <AuthProvider>
            <div className="App">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path="/profile-setup" element={<ProtectedRoute><ProfileSetup /></ProtectedRoute>} />
                <Route path="/workouts" element={<Workouts />} />
                <Route path="/workout/:id" element={<WorkoutDetail />} />
                <Route path="/exercise/:id" element={<ExerciseDetails />} />
                <Route path="/womens-health" element={<WomensHealth />} />
                <Route path="/diet-plans" element={<DietPlans />} />
                <Route path="/bmi-calculator" element={<BmiCalculator />} />
                <Route path="/doctor-consultation" element={<DoctorConsultation />} />
                <Route path="/gyms" element={<Gyms />} />
                <Route path="/gym/:id" element={<GymDetail />} />
                <Route path="/gyms/:gymId/book-trial" element={<GymBookTrial />} />
                <Route path="/gym-registration" element={<GymRegistration />} />
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/job/:id" element={<JobDetails />} />
                <Route path="/job/:id/apply" element={<JobApplication />} />
                <Route path="/job-application-success" element={<JobApplicationSuccess />} />
                <Route path="/community" element={<Community />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/disease-management" element={<DiseaseManagement />} />
                <Route path="/disease-management/:diseaseId" element={<DiseaseDetail />} />
                <Route path="/disease/:id" element={<DiseaseDetail />} />
                <Route path="/daily-routine" element={<DailyRoutine />} />
                <Route path="/marketplace" element={<Marketplace />} />
                <Route path="/marketplace/product/:id" element={<ProductDetail />} />
                <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
                <Route path="/subscription" element={<Subscription />} />
                <Route path="/premium-ai" element={<PremiumAi />} />
                <Route path="/premium-payment" element={<PremiumPayment />} />
                <Route path="/premium-unlocked" element={<PremiumUnlocked />} />
                <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Toaster />
            </div>
          </AuthProvider>
        </LanguageProvider>
      </QueryClientProvider>
    </Router>
  );
}

export default App;
