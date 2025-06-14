
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { sampleProducts } from '@/data/sampleProducts';
import { Loader2, Database, CheckCircle } from 'lucide-react';

const SampleDataSeeder = () => {
  const [loading, setLoading] = useState(false);
  const [seeded, setSeeded] = useState(false);
  const { toast } = useToast();

  const seedSampleProducts = async () => {
    setLoading(true);
    try {
      // Transform the sample products to match the database schema
      const productsToInsert = sampleProducts.map(product => ({
        id: product.id,
        name: product.name,
        brand: product.brand,
        category: product.category as 'food' | 'supplements' | 'fitness_gear' | 'wellness',
        subcategory: product.subcategory,
        description: product.description,
        price: product.price,
        health_score: Math.round(product.health_score),
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
        workflow_status: product.workflow_status || 'published'
      }));

      // Insert products in batches to avoid conflicts
      for (const product of productsToInsert) {
        const { error } = await supabase
          .from('products')
          .upsert(product, { onConflict: 'id' });

        if (error) {
          console.error('Error inserting product:', product.name, error);
          throw error;
        }
      }

      setSeeded(true);
      toast({
        title: "Success",
        description: `Successfully seeded ${productsToInsert.length} sample products`,
      });
    } catch (error) {
      console.error('Error seeding sample products:', error);
      toast({
        title: "Error",
        description: "Failed to seed sample products",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const clearSampleProducts = async () => {
    setLoading(true);
    try {
      const productIds = sampleProducts.map(p => p.id);
      
      const { error } = await supabase
        .from('products')
        .delete()
        .in('id', productIds);

      if (error) throw error;

      setSeeded(false);
      toast({
        title: "Success",
        description: "Sample products cleared successfully",
      });
    } catch (error) {
      console.error('Error clearing sample products:', error);
      toast({
        title: "Error",
        description: "Failed to clear sample products",
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
          Sample Data Management
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-gray-600">
          <p>This will add {sampleProducts.length} detailed grocery products with:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Quantity options and dynamic pricing</li>
            <li>Health ratings and warnings</li>
            <li>Detailed nutritional information</li>
            <li>Allergen information</li>
            <li>Organic and dietary preference indicators</li>
          </ul>
        </div>

        <div className="flex gap-4">
          <Button 
            onClick={seedSampleProducts}
            disabled={loading}
            className="flex items-center gap-2"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : seeded ? (
              <CheckCircle className="h-4 w-4" />
            ) : (
              <Database className="h-4 w-4" />
            )}
            {seeded ? 'Products Seeded' : 'Seed Sample Products'}
          </Button>

          {seeded && (
            <Button 
              onClick={clearSampleProducts}
              disabled={loading}
              variant="outline"
            >
              Clear Sample Data
            </Button>
          )}
        </div>

        <div className="text-xs text-gray-500">
          <p><strong>Categories included:</strong> Dairy, Bakery, Oils, Grains, Protein, Breakfast, Natural Sweeteners</p>
          <p><strong>Note:</strong> This will overwrite any existing products with the same IDs.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SampleDataSeeder;
