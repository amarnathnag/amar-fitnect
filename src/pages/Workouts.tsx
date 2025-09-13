
import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import WorkoutHero from '@/components/workouts/WorkoutHero';
import WorkoutTabs from '@/components/workouts/WorkoutTabs';
import WorkoutCTA from '@/components/workouts/WorkoutCTA';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Filter, Search, TrendingUp, Users, Clock, Star } from 'lucide-react';
import { workouts } from '@/data/workouts';

const Workouts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-muted/30">
      <NavBar />
      
      <main className="flex-grow">
        {/* Enhanced Hero Section */}
        <WorkoutHero />

        {/* Stats Section */}
        <section className="py-8 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <Card className="text-center p-4 hover-scale">
                <CardContent className="p-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-health-primary to-health-accent rounded-full flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-health-primary mb-1">500+</div>
                  <div className="text-sm text-muted-foreground">Workout Plans</div>
                </CardContent>
              </Card>
              
              <Card className="text-center p-4 hover-scale">
                <CardContent className="p-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-blue-600 mb-1">50K+</div>
                  <div className="text-sm text-muted-foreground">Active Users</div>
                </CardContent>
              </Card>
              
              <Card className="text-center p-4 hover-scale">
                <CardContent className="p-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-green-600 mb-1">15-60</div>
                  <div className="text-sm text-muted-foreground">Min Workouts</div>
                </CardContent>
              </Card>
              
              <Card className="text-center p-4 hover-scale">
                <CardContent className="p-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Star className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-purple-600 mb-1">4.9</div>
                  <div className="text-sm text-muted-foreground">Avg Rating</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="py-6 bg-gradient-to-r from-health-light/30 to-blue-50/50 dark:from-health-dark/20 dark:to-blue-900/20">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search workouts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-muted rounded-lg bg-background/80 backdrop-blur-sm focus:ring-2 focus:ring-health-primary focus:border-transparent transition-all"
                />
              </div>
              
              <div className="flex items-center gap-3">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="px-4 py-2 border border-muted rounded-lg bg-background/80 backdrop-blur-sm focus:ring-2 focus:ring-health-primary focus:border-transparent transition-all"
                >
                  <option value="all">All Levels</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Workouts Section */}
        <section className="py-12">
          <div className="container-custom">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-health-primary to-health-accent bg-clip-text text-transparent">
                Choose Your Perfect Workout
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                From beginner-friendly routines to advanced challenges, find the perfect workout to match your fitness level and goals.
              </p>
            </div>
            <WorkoutTabs workouts={workouts} />
          </div>
        </section>

        {/* CTA Section */}
        <WorkoutCTA />
      </main>

      <Footer />
    </div>
  );
};

export default Workouts;
