
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-card border-t border-border mt-16">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and about */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-health-primary to-health-accent flex items-center justify-center text-white font-bold text-lg">
                SD
              </div>
              <span className="text-xl font-semibold bg-gradient-to-r from-health-primary to-health-accent bg-clip-text text-transparent">
                SmartDoc AI
              </span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Your personalized health companion providing AI-powered health insights, diet plans, workouts & consultation with real doctors.
            </p>
            <div className="flex mt-4 space-x-4">
              <a href="#" className="text-gray-500 hover:text-health-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-health-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-health-primary transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-health-primary transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/diet-plans" className="text-gray-600 dark:text-gray-400 hover:text-health-primary transition-colors">Diet Plans</Link>
              </li>
              <li>
                <Link to="/workouts" className="text-gray-600 dark:text-gray-400 hover:text-health-primary transition-colors">Workouts</Link>
              </li>
              <li>
                <Link to="/bmi-calculator" className="text-gray-600 dark:text-gray-400 hover:text-health-primary transition-colors">BMI Calculator</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 dark:text-gray-400 hover:text-health-primary transition-colors">About</Link>
              </li>
            </ul>
          </div>

          {/* Programs */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Programs</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/disease-management" className="text-gray-600 dark:text-gray-400 hover:text-health-primary transition-colors">Disease Management</Link>
              </li>
              <li>
                <Link to="/daily-routine" className="text-gray-600 dark:text-gray-400 hover:text-health-primary transition-colors">Daily Routine</Link>
              </li>
              <li>
                <Link to="/community" className="text-gray-600 dark:text-gray-400 hover:text-health-primary transition-colors">Community</Link>
              </li>
              <li>
                <Link to="/profile" className="text-gray-600 dark:text-gray-400 hover:text-health-primary transition-colors">Profile</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li>
                <a href="mailto:amarnathnag0609@gmail.com" className="hover:text-health-primary transition-colors">
                  Email: amarnathnag0609@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+919883810559" className="hover:text-health-primary transition-colors">
                  Phone: +91 9883810559
                </a>
              </li>
              <li>Address: 123 Health Street</li>
              <li>City, State 12345</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} SmartDoc AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
