
import React from 'react';

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({ images, productName }) => {
  return (
    <div className="space-y-4">
      <div className="aspect-square overflow-hidden rounded-lg">
        <img 
          src={images?.[0] || '/placeholder.svg'}
          alt={productName}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default ProductImageGallery;
