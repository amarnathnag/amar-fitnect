
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ProductCard from './ProductCard';
import { useCart } from '@/hooks/useCart';

const HealthProductsSection = () => {
  const { addToCart } = useCart();

  const healthSupplements = [
    {
      id: 'sup001',
      name: 'Premium Multivitamin Complex',
      brand: 'VitaLife Pro',
      price: 89900, // ₹899
      health_score: 9,
      image_urls: ["https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80"],
      health_impact_summary: 'Complete daily nutrition with 25 essential vitamins and minerals for optimal health',
      is_organic: true,
      is_vegetarian: true,
      is_vegan: true,
      stock_quantity: 50,
      category: 'supplements',
      subcategory: 'multivitamins',
      description: 'Premium multivitamin complex with bioavailable forms of essential nutrients. Supports immune function, energy metabolism, and overall wellness.',
      user_rating: 4.7,
      review_count: 892
    },
    {
      id: 'sup002',
      name: 'Omega-3 Fish Oil Capsules',
      brand: 'PureFish',
      price: 149900, // ₹1499
      health_score: 9,
      image_urls: ["https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80"],
      health_impact_summary: 'High-potency EPA/DHA for heart health, brain function, and inflammation support',
      is_organic: false,
      is_vegetarian: false,
      is_vegan: false,
      stock_quantity: 35,
      category: 'supplements',
      subcategory: 'omega_fatty_acids',
      description: 'Premium fish oil with high concentration of EPA and DHA. Molecularly distilled for purity and potency.',
      user_rating: 4.8,
      review_count: 567
    },
    {
      id: 'sup003',
      name: 'Plant-Based Protein Powder',
      brand: 'GreenFuel',
      price: 249900, // ₹2499
      health_score: 8,
      image_urls: ["https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80"],
      health_impact_summary: 'Complete amino acid profile from pea, hemp, and rice proteins for muscle building',
      is_organic: true,
      is_vegetarian: true,
      is_vegan: true,
      stock_quantity: 42,
      category: 'supplements',
      subcategory: 'protein_powders',
      description: 'Organic plant-based protein blend with all essential amino acids. Perfect for post-workout recovery.',
      user_rating: 4.6,
      review_count: 423
    },
    {
      id: 'sup004',
      name: 'Vitamin D3 + K2 Complex',
      brand: 'SunVitamin',
      price: 79900, // ₹799
      health_score: 9,
      image_urls: ["https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80"],
      health_impact_summary: 'Bone health support with optimal calcium absorption and utilization',
      is_organic: false,
      is_vegetarian: true,
      is_vegan: true,
      stock_quantity: 67,
      category: 'supplements',
      subcategory: 'vitamins',
      description: 'High-potency Vitamin D3 paired with K2 for enhanced calcium absorption and bone health.',
      user_rating: 4.5,
      review_count: 234
    },
    {
      id: 'sup005',
      name: 'Probiotic Complex 50 Billion CFU',
      brand: 'GutHealth Pro',
      price: 119900, // ₹1199
      health_score: 9,
      image_urls: ["https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80"],
      health_impact_summary: 'Advanced probiotic formula for digestive health and immune system support',
      is_organic: true,
      is_vegetarian: true,
      is_vegan: true,
      stock_quantity: 28,
      category: 'supplements',
      subcategory: 'probiotics',
      description: '15 probiotic strains with 50 billion CFU for comprehensive digestive and immune support.',
      user_rating: 4.7,
      review_count: 678
    },
    {
      id: 'sup006',
      name: 'Ashwagandha Root Extract',
      brand: 'AdaptaHerb',
      price: 99900, // ₹999
      health_score: 8,
      image_urls: ["https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80"],
      health_impact_summary: 'Adaptogenic herb for stress relief, energy, and hormonal balance',
      is_organic: true,
      is_vegetarian: true,
      is_vegan: true,
      stock_quantity: 45,
      category: 'supplements',
      subcategory: 'adaptogens',
      description: 'Standardized ashwagandha root extract for stress management and overall vitality.',
      user_rating: 4.4,
      review_count: 389
    },
    {
      id: 'sup007',
      name: 'Magnesium Glycinate 400mg',
      brand: 'MineralMax',
      price: 69900, // ₹699
      health_score: 8,
      image_urls: ["https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80"],
      health_impact_summary: 'Highly bioavailable magnesium for muscle function, sleep, and relaxation',
      is_organic: false,
      is_vegetarian: true,
      is_vegan: true,
      stock_quantity: 53,
      category: 'supplements',
      subcategory: 'minerals',
      description: 'Chelated magnesium glycinate for superior absorption and muscle relaxation.',
      user_rating: 4.6,
      review_count: 445
    },
    {
      id: 'sup008',
      name: 'Turmeric Curcumin with BioPerine',
      brand: 'GoldenRoot',
      price: 89900, // ₹899
      health_score: 9,
      image_urls: ["https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80"],
      health_impact_summary: 'Powerful anti-inflammatory support with enhanced absorption',
      is_organic: true,
      is_vegetarian: true,
      is_vegan: true,
      stock_quantity: 37,
      category: 'supplements',
      subcategory: 'anti_inflammatory',
      description: 'Standardized turmeric extract with black pepper for maximum curcumin absorption.',
      user_rating: 4.5,
      review_count: 512
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Premium Health Supplements</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Scientifically-backed supplements for optimal health and wellness
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {healthSupplements.map((supplement) => (
          <ProductCard 
            key={supplement.id}
            product={supplement}
            onAddToCart={() => addToCart(supplement)}
          />
        ))}
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Why Choose Our Health Supplements?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <h4 className="font-semibold mb-2">Third-Party Tested</h4>
              <p className="text-sm text-gray-600">All supplements are tested for purity and potency by independent laboratories.</p>
            </div>
            <div className="text-center">
              <h4 className="font-semibold mb-2">Science-Backed</h4>
              <p className="text-sm text-gray-600">Formulations based on peer-reviewed research and clinical studies.</p>
            </div>
            <div className="text-center">
              <h4 className="font-semibold mb-2">Premium Quality</h4>
              <p className="text-sm text-gray-600">Made with high-quality ingredients and manufactured in certified facilities.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthProductsSection;
