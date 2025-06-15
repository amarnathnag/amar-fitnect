
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
    
    // Transform products to match database schema
    const productsForDb = allProducts.map(product => ({
      id: product.id,
      name: product.name,
      brand: product.brand,
      category: 'food' as const, // Force to the correct type
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
    }));
    
    // Insert products in batches
    const batchSize = 5;
    let insertedCount = 0;
    
    for (let i = 0; i < productsForDb.length; i += batchSize) {
      const batch = productsForDb.slice(i, i + batchSize);
      
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
