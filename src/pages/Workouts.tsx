
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import WorkoutHero from '@/components/workouts/WorkoutHero';
import WorkoutTabs from '@/components/workouts/WorkoutTabs';
import WorkoutCTA from '@/components/workouts/WorkoutCTA';
import { workouts } from '@/data/workouts';

const Workouts = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <WorkoutHero />

        {/* Workouts Section */}
        <section className="py-12">
          <div className="container-custom">
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
