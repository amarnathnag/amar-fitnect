
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ProductFormProps {
  product?: any;
  onSuccess: () => void;
  onCancel: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    subcategory: '',
    brand: '',
    price: '',
    stock_quantity: '',
    health_score: '',
    is_organic: false,
    is_vegetarian: false,
    is_vegan: false,
    image_urls: '',
    health_impact_summary: '',
    allergens: '',
    ingredients: '',
    nutritional_info: ''
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        description: product.description || '',
        category: product.category || '',
        subcategory: product.subcategory || '',
        brand: product.brand || '',
        price: product.price?.toString() || '',
        stock_quantity: product.stock_quantity?.toString() || '',
        health_score: product.health_score?.toString() || '',
        is_organic: product.is_organic || false,
        is_vegetarian: product.is_vegetarian || false,
        is_vegan: product.is_vegan || false,
        image_urls: product.image_urls?.join(', ') || '',
        health_impact_summary: product.health_impact_summary || '',
        allergens: product.allergens?.join(', ') || '',
        ingredients: JSON.stringify(product.ingredients) || '',
        nutritional_info: JSON.stringify(product.nutritional_info) || ''
      });
    }
  }, [product]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const productData = {
        name: formData.name,
        description: formData.description,
        category: formData.category,
        subcategory: formData.subcategory,
        brand: formData.brand,
        price: parseFloat(formData.price),
        stock_quantity: parseInt(formData.stock_quantity),
        health_score: parseInt(formData.health_score),
        is_organic: formData.is_organic,
        is_vegetarian: formData.is_vegetarian,
        is_vegan: formData.is_vegan,
        image_urls: formData.image_urls.split(',').map(url => url.trim()).filter(Boolean),
        health_impact_summary: formData.health_impact_summary,
        allergens: formData.allergens.split(',').map(item => item.trim()).filter(Boolean),
        ingredients: formData.ingredients ? JSON.parse(formData.ingredients) : null,
        nutritional_info: formData.nutritional_info ? JSON.parse(formData.nutritional_info) : null,
        status: 'approved'
      };

      let result;
      if (product) {
        result = await supabase
          .from('products')
          .update(productData)
          .eq('id', product.id);
      } else {
        result = await supabase
          .from('products')
          .insert([productData]);
      }

      if (result.error) throw result.error;

      toast({
        title: "Success",
        description: `Product ${product ? 'updated' : 'created'} successfully`,
      });
      
      onSuccess();
    } catch (error) {
      console.error('Error saving product:', error);
      toast({
        title: "Error",
        description: "Failed to save product",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-h-96 overflow-y-auto">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Product Name *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            required
          />
        </div>
        <div>
          <Label htmlFor="brand">Brand *</Label>
          <Input
            id="brand"
            value={formData.brand}
            onChange={(e) => setFormData(prev => ({ ...prev, brand: e.target.value }))}
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="category">Category *</Label>
          <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="food_beverage">Food & Beverage</SelectItem>
              <SelectItem value="supplements">Supplements</SelectItem>
              <SelectItem value="fitness_equipment">Fitness Equipment</SelectItem>
              <SelectItem value="personal_care">Personal Care</SelectItem>
              <SelectItem value="medical_devices">Medical Devices</SelectItem>
              <SelectItem value="organic_foods">Organic Foods</SelectItem>
              <SelectItem value="baby_care">Baby Care</SelectItem>
              <SelectItem value="vitamins_minerals">Vitamins & Minerals</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="subcategory">Subcategory</Label>
          <Input
            id="subcategory"
            value={formData.subcategory}
            onChange={(e) => setFormData(prev => ({ ...prev, subcategory: e.target.value }))}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="price">Price (₹) *</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
            required
          />
        </div>
        <div>
          <Label htmlFor="stock">Stock Quantity *</Label>
          <Input
            id="stock"
            type="number"
            value={formData.stock_quantity}
            onChange={(e) => setFormData(prev => ({ ...prev, stock_quantity: e.target.value }))}
            required
          />
        </div>
        <div>
          <Label htmlFor="health_score">Health Score (1-10) *</Label>
          <Input
            id="health_score"
            type="number"
            min="1"
            max="10"
            value={formData.health_score}
            onChange={(e) => setFormData(prev => ({ ...prev, health_score: e.target.value }))}
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="image_urls">Image URLs (comma separated)</Label>
        <Textarea
          id="image_urls"
          value={formData.image_urls}
          onChange={(e) => setFormData(prev => ({ ...prev, image_urls: e.target.value }))}
          placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
        />
      </div>

      <div>
        <Label htmlFor="health_impact">Health Impact Summary</Label>
        <Textarea
          id="health_impact"
          value={formData.health_impact_summary}
          onChange={(e) => setFormData(prev => ({ ...prev, health_impact_summary: e.target.value }))}
        />
      </div>

      <div className="flex gap-6">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="organic"
            checked={formData.is_organic}
            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_organic: checked as boolean }))}
          />
          <Label htmlFor="organic">Organic</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="vegetarian"
            checked={formData.is_vegetarian}
            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_vegetarian: checked as boolean }))}
          />
          <Label htmlFor="vegetarian">Vegetarian</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="vegan"
            checked={formData.is_vegan}
            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_vegan: checked as boolean }))}
          />
          <Label htmlFor="vegan">Vegan</Label>
        </div>
      </div>

      <div className="flex gap-4 pt-4">
        <Button type="submit" disabled={loading}>
          {loading ? 'Saving...' : (product ? 'Update Product' : 'Create Product')}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default ProductForm;
