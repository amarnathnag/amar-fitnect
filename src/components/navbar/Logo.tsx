
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Shield } from 'lucide-react';

const Logo: React.FC = () => {
  return (
    <NavLink to="/" className="text-xl font-bold flex items-center">
      <Shield className="h-6 w-6 text-health-primary mr-1.5" />
      <span className="hidden md:block text-health-primary font-poppins tracking-tight">
        SmartDoc AI
      </span>
      <span className="md:hidden text-health-primary font-poppins tracking-tight">
        SD
      </span>
    </NavLink>
  );
};

export default Logo;
