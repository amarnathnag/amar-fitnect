
import { supabase } from '@/integrations/supabase/client';
import { additionalProducts } from '@/data/additionalProducts';
import { groceryProducts } from '@/data/groceryProducts';

export const seedSampleProducts = async () => {
  try {
    console.log('Starting to seed sample products...');
    
    // Combine all products
    const allProducts = [...additionalProducts, ...groceryProducts];
    
    // Check if products already exist
    const { data: existingProducts, error: fetchError } = await supabase
      .from('products')
      .select('id')
      .limit(1);
    
    if (fetchError) {
      console.error('Error checking existing products:', fetchError);
      return { success: false, error: fetchError.message };
    }
    
    if (existingProducts && existingProducts.length > 0) {
      console.log('Products already exist in database');
      return { success: true, message: 'Products already exist' };
    }
    
    // Insert products in batches
    const batchSize = 5;
    let insertedCount = 0;
    
    for (let i = 0; i < allProducts.length; i += batchSize) {
      const batch = allProducts.slice(i, i + batchSize);
      
      const { data, error } = await supabase
        .from('products')
        .insert(batch)
        .select('id');
      
      if (error) {
        console.error('Error inserting batch:', error);
        continue;
      }
      
      insertedCount += data?.length || 0;
      console.log(`Inserted batch ${Math.floor(i / batchSize) + 1}, total: ${insertedCount}`);
    }
    
    console.log(`Successfully seeded ${insertedCount} products`);
    return { success: true, count: insertedCount };
    
  } catch (error) {
    console.error('Error seeding products:', error);
    return { success: false, error: error.message };
  }
};
