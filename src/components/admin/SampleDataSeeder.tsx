
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { sampleProducts } from '@/data/sampleProducts';
import { Database, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

const SampleDataSeeder = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { toast } = useToast();

  const seedSampleData = async () => {
    try {
      setLoading(true);
      setSuccess(false);

      console.log('Starting to seed sample products...');

      // First, check if products already exist
      const { data: existingProducts, error: checkError } = await supabase
        .from('products')
        .select('id, name')
        .limit(5);

      if (checkError) {
        console.error('Error checking existing products:', checkError);
        throw checkError;
      }

      if (existingProducts && existingProducts.length > 0) {
        toast({
          title: "Products Already Exist",
          description: `Found ${existingProducts.length} existing products. Sample data may already be seeded.`,
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      // Prepare products for database insertion with proper categories
      const productsToInsert = sampleProducts.map(product => {
        // Map subcategory to main category for better organization
        let mainCategory: 'food' | 'supplements' | 'fitness_gear' | 'wellness' = 'food';
        
        if (product.subcategory === 'supplements' || product.subcategory === 'vitamins') {
          mainCategory = 'supplements';
        } else if (product.subcategory === 'fitness' || product.subcategory === 'equipment') {
          mainCategory = 'fitness_gear';
        } else if (product.subcategory === 'personal_care' || product.subcategory === 'wellness') {
          mainCategory = 'wellness';
        }

        return {
          id: product.id,
          name: product.name,
          brand: product.brand,
          category: mainCategory,
          subcategory: product.subcategory,
          description: product.description,
          price: product.price,
          health_score: product.health_score,
          image_urls: product.image_urls,
          health_impact_summary: product.health_impact_summary,
          is_organic: product.is_organic,
          is_vegetarian: product.is_vegetarian,
          is_vegan: product.is_vegan,
          stock_quantity: product.stock_quantity,
          ingredients: product.ingredients,
          allergens: product.allergens,
          nutritional_info: product.nutritional_info,
          status: 'active' as const,
          workflow_status: 'published'
        };
      });

      console.log('Inserting products:', productsToInsert.length);

      // Insert products
      const { data, error } = await supabase
        .from('products')
        .insert(productsToInsert)
        .select();

      if (error) {
        console.error('Error inserting products:', error);
        throw error;
      }

      console.log('Successfully inserted products:', data?.length);

      setSuccess(true);
      toast({
        title: "Sample Data Seeded Successfully!",
        description: `${data?.length || sampleProducts.length} products have been added to the database.`,
      });

    } catch (error) {
      console.error('Error seeding sample data:', error);
      toast({
        title: "Error Seeding Data",
        description: "Failed to seed sample data. Check console for details.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const clearAllProducts = async () => {
    try {
      setLoading(true);
      
      const { error } = await supabase
        .from('products')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all products

      if (error) throw error;

      setSuccess(false);
      toast({
        title: "All Products Cleared",
        description: "All products have been removed from the database.",
      });

    } catch (error) {
      console.error('Error clearing products:', error);
      toast({
        title: "Error Clearing Data",
        description: "Failed to clear products.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Sample Data Seeder
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          This will add {sampleProducts.length} sample grocery products to your marketplace database.
          Each product includes detailed descriptions, health ratings, pricing, and quantity options.
        </p>

        <div className="flex gap-3">
          <Button
            onClick={seedSampleData}
            disabled={loading}
            className="flex items-center gap-2"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : success ? (
              <CheckCircle className="h-4 w-4" />
            ) : (
              <Database className="h-4 w-4" />
            )}
            {loading ? 'Seeding...' : success ? 'Data Seeded!' : 'Seed Sample Data'}
          </Button>

          <Button
            onClick={clearAllProducts}
            disabled={loading}
            variant="destructive"
            className="flex items-center gap-2"
          >
            <AlertCircle className="h-4 w-4" />
            Clear All Products
          </Button>
        </div>

        {success && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-700">
              ✅ Sample data has been successfully seeded! You can now browse the marketplace with {sampleProducts.length} products.
            </p>
          </div>
        )}

        <div className="text-xs text-gray-500">
          <p><strong>Products included:</strong></p>
          <ul className="list-disc list-inside mt-1">
            <li>Organic Cow Milk (1L, 2L, 5L options)</li>
            <li>Brown Bread (Whole Wheat)</li>
            <li>Extra Virgin Olive Oil</li>
            <li>Organic Basmati Rice</li>
            <li>Free-Range Eggs</li>
            <li>Low-Fat Greek Yogurt</li>
            <li>Multigrain Atta</li>
            <li>Cold-Pressed Coconut Oil</li>
            <li>Gluten-Free Oats</li>
            <li>Raw Organic Honey</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default SampleDataSeeder;
