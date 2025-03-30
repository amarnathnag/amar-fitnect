
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Menu, X, Home, PieChart, Utensils, Dumbbell, Activity, Clock, Users, User, LayoutGrid, HeartPulse } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Features menu items
  const featuresLinks = [
    { name: "BMI Calculator", path: "/bmi-calculator", icon: <PieChart className="h-4 w-4 mr-2" /> },
    { name: "Diet Plans", path: "/diet-plans", icon: <Utensils className="h-4 w-4 mr-2" /> },
    { name: "Workouts", path: "/workouts", icon: <Dumbbell className="h-4 w-4 mr-2" /> },
    { name: "Disease Management", path: "/disease-management", icon: <Activity className="h-4 w-4 mr-2" /> },
    { name: "Daily Routine", path: "/daily-routine", icon: <Clock className="h-4 w-4 mr-2" /> },
  ];

  // Consultancy menu items
  const consultancyLinks = [
    { name: "Doctor Consultation", path: "/doctor-consultation", icon: <HeartPulse className="h-4 w-4 mr-2" /> },
    { name: "Premium AI Health Assistant", path: "/premium-ai", icon: <LayoutGrid className="h-4 w-4 mr-2" /> },
    { name: "Community Discussions", path: "/community", icon: <Users className="h-4 w-4 mr-2" /> },
  ];

  return (
    <nav className="bg-white dark:bg-card border-b border-border sticky top-0 z-50">
      <div className="container-custom py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-health-primary to-health-accent flex items-center justify-center text-white font-bold text-lg">
              SD
            </div>
            <span className="text-xl font-semibold bg-gradient-to-r from-health-primary to-health-accent bg-clip-text text-transparent">
              SmartDoc AI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {/* Home Link */}
            <Link 
              to="/"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-health-light dark:hover:bg-health-dark/20 hover:text-health-primary flex items-center gap-1.5 transition-colors"
            >
              <Home className="h-4 w-4" />
              Home
            </Link>

            {/* Features Dropdown (NavigationMenu) */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-health-light dark:hover:bg-health-dark/20 hover:text-health-primary flex items-center gap-1.5 transition-colors">
                    <LayoutGrid className="h-4 w-4" />
                    Features
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 w-[220px]">
                      {featuresLinks.map((link) => (
                        <li key={link.name}>
                          <NavigationMenuLink asChild>
                            <Link
                              to={link.path}
                              className="flex items-center p-2 rounded-md hover:bg-health-light dark:hover:bg-health-dark/20 hover:text-health-primary"
                            >
                              {link.icon}
                              <span>{link.name}</span>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Consultancy Dropdown (NavigationMenu) */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-health-light dark:hover:bg-health-dark/20 hover:text-health-primary flex items-center gap-1.5 transition-colors">
                    <HeartPulse className="h-4 w-4" />
                    Consultancy
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 w-[220px]">
                      {consultancyLinks.map((link) => (
                        <li key={link.name}>
                          <NavigationMenuLink asChild>
                            <Link
                              to={link.path}
                              className="flex items-center p-2 rounded-md hover:bg-health-light dark:hover:bg-health-dark/20 hover:text-health-primary"
                            >
                              {link.icon}
                              <span>{link.name}</span>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Community Link */}
            <Link 
              to="/community"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-health-light dark:hover:bg-health-dark/20 hover:text-health-primary flex items-center gap-1.5 transition-colors"
            >
              <Users className="h-4 w-4" />
              Community
            </Link>

            {/* About Link */}
            <Link 
              to="/about"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-health-light dark:hover:bg-health-dark/20 hover:text-health-primary flex items-center gap-1.5 transition-colors"
            >
              About
            </Link>

            {/* Contact Link */}
            <Link 
              to="/contact"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-health-light dark:hover:bg-health-dark/20 hover:text-health-primary flex items-center gap-1.5 transition-colors"
            >
              Contact
            </Link>

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
          <div className="lg:hidden mt-3 pb-3 animate-fade-in space-y-2">
            {/* Home Link */}
            <Link 
              to="/"
              className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-health-light dark:hover:bg-health-dark/20 hover:text-health-primary flex items-center gap-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Home className="h-4 w-4" />
              Home
            </Link>

            {/* Features Dropdown (Mobile) */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="w-full px-3 py-3 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-health-light dark:hover:bg-health-dark/20 hover:text-health-primary flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <LayoutGrid className="h-4 w-4" />
                    Features
                  </span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full min-w-[200px]">
                {featuresLinks.map((link) => (
                  <DropdownMenuItem key={link.name} asChild>
                    <Link
                      to={link.path}
                      className="flex items-center w-full"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.icon}
                      <span>{link.name}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Consultancy Dropdown (Mobile) */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="w-full px-3 py-3 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-health-light dark:hover:bg-health-dark/20 hover:text-health-primary flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <HeartPulse className="h-4 w-4" />
                    Consultancy
                  </span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full min-w-[200px]">
                {consultancyLinks.map((link) => (
                  <DropdownMenuItem key={link.name} asChild>
                    <Link
                      to={link.path}
                      className="flex items-center w-full"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.icon}
                      <span>{link.name}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Community Link */}
            <Link 
              to="/community"
              className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-health-light dark:hover:bg-health-dark/20 hover:text-health-primary flex items-center gap-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Users className="h-4 w-4" />
              Community
            </Link>

            {/* About Link */}
            <Link 
              to="/about"
              className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-health-light dark:hover:bg-health-dark/20 hover:text-health-primary flex items-center gap-2"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>

            {/* Contact Link */}
            <Link 
              to="/contact"
              className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-health-light dark:hover:bg-health-dark/20 hover:text-health-primary flex items-center gap-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>

            <Button className="mt-2 bg-health-primary hover:bg-health-dark w-full justify-start" asChild>
              <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
                <User className="mr-2 h-4 w-4" /> Profile
              </Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
