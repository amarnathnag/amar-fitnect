
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { ArrowRight, ActivitySquare, Utensils, Dumbbell, Calendar, PieChart, Activity } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-health-light to-blue-50 dark:from-health-dark/30 dark:to-blue-900/30 py-20 md:py-32">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div className="animate-fade-in-up">
                <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                  Your Personalized <span className="text-health-primary">Diet & Fitness</span> Companion
                </h1>
                <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8">
                  Get science-backed meal plans, workouts & daily routines tailored specifically for you and your health goals.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button className="btn-primary" asChild>
                    <Link to="/bmi-calculator">
                      Start Your Journey <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" className="btn-outline" asChild>
                    <Link to="/diet-plans">
                      Explore Diet Plans
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="hidden md:block relative">
                <div className="aspect-square bg-white dark:bg-card rounded-lg p-2 shadow-xl relative overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2153&q=80" 
                    alt="Healthy food and fitness" 
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <div className="absolute -right-6 bottom-20 bg-white dark:bg-card p-4 rounded-xl shadow-lg animate-fade-in">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-health-primary"></div>
                      <span className="text-sm font-medium">Personalized Plans</span>
                    </div>
                  </div>
                  <div className="absolute -left-6 top-20 bg-white dark:bg-card p-4 rounded-xl shadow-lg animate-fade-in" style={{ animationDelay: '0.3s' }}>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-health-secondary"></div>
                      <span className="text-sm font-medium">Health Tracking</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="section-title">What We Offer</h2>
              <p className="section-subtitle mx-auto">
                Comprehensive health solutions tailored to meet your personal wellness goals
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="health-card p-6">
                <div className="w-12 h-12 bg-health-light dark:bg-health-dark/20 rounded-lg flex items-center justify-center mb-4">
                  <Utensils className="text-health-primary h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Personalized Meal Plans</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Customized nutrition plans for vegetarian, non-vegetarian, and vegan diets designed to meet your specific health goals.
                </p>
                <Link to="/diet-plans" className="text-health-primary hover:text-health-dark font-medium inline-flex items-center">
                  View Diet Plans <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>

              {/* Feature 2 */}
              <div className="health-card p-6">
                <div className="w-12 h-12 bg-health-light dark:bg-health-dark/20 rounded-lg flex items-center justify-center mb-4">
                  <Dumbbell className="text-health-primary h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Workout Routines</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Effective exercise programs tailored to your fitness level, goals, and preferences with step-by-step instructions.
                </p>
                <Link to="/workouts" className="text-health-primary hover:text-health-dark font-medium inline-flex items-center">
                  Explore Workouts <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>

              {/* Feature 3 */}
              <div className="health-card p-6">
                <div className="w-12 h-12 bg-health-light dark:bg-health-dark/20 rounded-lg flex items-center justify-center mb-4">
                  <Calendar className="text-health-primary h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Daily Routine</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Structured daily schedules with optimal meal timing, exercise slots, and hydration reminders for maximum results.
                </p>
                <Link to="/daily-routine" className="text-health-primary hover:text-health-dark font-medium inline-flex items-center">
                  See Routines <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>

              {/* Feature 4 */}
              <div className="health-card p-6">
                <div className="w-12 h-12 bg-health-light dark:bg-health-dark/20 rounded-lg flex items-center justify-center mb-4">
                  <PieChart className="text-health-primary h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">BMI Calculator</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Calculate your Body Mass Index and get personalized recommendations based on your health metrics.
                </p>
                <Link to="/bmi-calculator" className="text-health-primary hover:text-health-dark font-medium inline-flex items-center">
                  Calculate BMI <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>

              {/* Feature 5 */}
              <div className="health-card p-6">
                <div className="w-12 h-12 bg-health-light dark:bg-health-dark/20 rounded-lg flex items-center justify-center mb-4">
                  <Activity className="text-health-primary h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Disease Management</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Specialized plans for managing health conditions like diabetes, hypertension, thyroid disorders, and more.
                </p>
                <Link to="/disease-management" className="text-health-primary hover:text-health-dark font-medium inline-flex items-center">
                  Learn More <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>

              {/* Feature 6 */}
              <div className="health-card p-6">
                <div className="w-12 h-12 bg-health-light dark:bg-health-dark/20 rounded-lg flex items-center justify-center mb-4">
                  <ActivitySquare className="text-health-primary h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Community Support</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Connect with like-minded individuals, share success stories, and get motivation from our supportive community.
                </p>
                <Link to="/community" className="text-health-primary hover:text-health-dark font-medium inline-flex items-center">
                  Join Community <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-health-primary to-health-accent text-white py-16">
          <div className="container-custom">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Health?</h2>
              <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">
                Start your journey today with personalized diet plans, workout routines, and health management tools.
              </p>
              <Button className="bg-white text-health-primary hover:bg-gray-100 hover:text-health-dark" size="lg" asChild>
                <Link to="/bmi-calculator">
                  Check Your BMI Now <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
