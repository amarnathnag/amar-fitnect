
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Menu, X, Home, PieChart, Utensils, Dumbbell, Activity, Clock, Users, User } from "lucide-react";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { name: "Home", path: "/", icon: <Home className="h-4 w-4" /> },
    { name: "BMI Calculator", path: "/bmi-calculator", icon: <PieChart className="h-4 w-4" /> },
    { name: "Diet Plans", path: "/diet-plans", icon: <Utensils className="h-4 w-4" /> },
    { name: "Workouts", path: "/workouts", icon: <Dumbbell className="h-4 w-4" /> },
    { name: "Disease Management", path: "/disease-management", icon: <Activity className="h-4 w-4" /> },
    { name: "Daily Routine", path: "/daily-routine", icon: <Clock className="h-4 w-4" /> },
    { name: "Community", path: "/community", icon: <Users className="h-4 w-4" /> },
  ];

  return (
    <nav className="bg-white dark:bg-card border-b border-border sticky top-0 z-50">
      <div className="container-custom py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-health-primary to-health-accent flex items-center justify-center text-white font-bold text-lg">
              AH
            </div>
            <span className="text-xl font-semibold bg-gradient-to-r from-health-primary to-health-accent bg-clip-text text-transparent">
              Amar Healthy Health
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                to={link.path}
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-health-light dark:hover:bg-health-dark/20 hover:text-health-primary flex items-center gap-1.5 transition-colors"
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
            <Button className="ml-2 bg-health-primary hover:bg-health-dark" asChild>
              <Link to="/profile">
                <User className="mr-2 h-4 w-4" /> Profile
              </Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button 
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-health-light dark:hover:bg-health-dark/20"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden mt-3 pb-3 animate-fade-in">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <Link 
                  key={link.name}
                  to={link.path}
                  className="px-3 py-3 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-health-light dark:hover:bg-health-dark/20 hover:text-health-primary flex items-center gap-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.icon}
                  {link.name}
                </Link>
              ))}
              <Button className="mt-2 bg-health-primary hover:bg-health-dark w-full justify-start" asChild>
                <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
                  <User className="mr-2 h-4 w-4" /> Profile
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
