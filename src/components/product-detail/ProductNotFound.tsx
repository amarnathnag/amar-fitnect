
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

const ProductNotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <div className="flex-grow flex items-center justify-center">
        <div>Product not found</div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductNotFound;
