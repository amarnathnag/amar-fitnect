
import React from 'react';
import { NavLink } from 'react-router-dom';

const Logo: React.FC = () => {
  return (
    <NavLink to="/" className="text-xl font-bold text-health-primary flex items-center">
      <span className="hidden md:inline">AmarHealth</span>
      <span className="md:hidden">AH</span>
    </NavLink>
  );
};

export default Logo;
