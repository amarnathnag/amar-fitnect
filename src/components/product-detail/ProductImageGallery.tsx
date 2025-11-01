
import React from 'react';

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({ images, productName }) => {
  return (
    <div className="space-y-4">
      <div className="aspect-square overflow-hidden rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
        <img 
          src={images?.[0] || 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400'}
          alt={productName}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400';
          }}
        />
      </div>
    </div>
  );
};

export default ProductImageGallery;
