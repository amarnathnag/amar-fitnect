
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useWorkflow } from '@/hooks/useWorkflow';

interface EnhancedProductFormProps {
  product?: any;
  onSuccess: () => void;
  onCancel: () => void;
}

const EnhancedProductForm: React.FC<EnhancedProductFormProps> = ({ product, onSuccess, onCancel }) => {
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
    nutritional_info: '',
    workflow_status: 'draft',
    admin_notes: '',
    manual_override: false
  });
  const [loading, setLoading] = useState(false);
  const [autoHealthScore, setAutoHealthScore] = useState<number | null>(null);
  const { toast } = useToast();
  const { createWorkflowTask, fetchHistory, history } = useWorkflow();

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
        nutritional_info: JSON.stringify(product.nutritional_info) || '',
        workflow_status: product.workflow_status || 'draft',
        admin_notes: product.admin_notes || '',
        manual_override: product.manual_override || false
      });
      
      if (product.auto_health_score) {
        setAutoHealthScore(product.auto_health_score);
      }
      
      fetchHistory(product.id);
    }
  }, [product, fetchHistory]);

  const calculateAutoHealthScore = () => {
    if (!formData.ingredients) return;
    
    try {
      const ingredients = JSON.parse(formData.ingredients);
      if (!Array.isArray(ingredients)) return;
      
      let score = 7;
      const badIngredients = ['refined oil', 'sugar', 'maida', 'artificial flavoring', 'preservatives'];
      const goodIngredients = ['olive oil', 'whole grain', 'fiber', 'protein', 'organic', 'natural'];
      
      ingredients.forEach((ingredient: string) => {
        const lowerIngredient = ingredient.toLowerCase();
        if (badIngredients.some(bad => lowerIngredient.includes(bad))) {
          score -= 1;
        }
        if (goodIngredients.some(good => lowerIngredient.includes(good))) {
          score += 1;
        }
      });
      
      const finalScore = Math.max(1, Math.min(10, score));
      setAutoHealthScore(finalScore);
      
      if (!formData.manual_override) {
        setFormData(prev => ({ ...prev, health_score: finalScore.toString() }));
      }
    } catch (error) {
      console.error('Error calculating auto health score:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const productData = {
        name: formData.name,
        description: formData.description,
        category: formData.category as 'food' | 'supplements' | 'fitness_gear' | 'wellness',
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
        workflow_status: formData.workflow_status,
        admin_notes: formData.admin_notes,
        manual_override: formData.manual_override,
        status: 'active' as 'active' | 'inactive' | 'pending_approval'
      };

      let result;
      if (product) {
        result = await supabase
          .from('products')
          .update(productData)
          .eq('id', product.id)
          .select()
          .single();
      } else {
        result = await supabase
          .from('products')
          .insert(productData)
          .select()
          .single();
      }

      if (result.error) throw result.error;

      // Create workflow task if product needs review
      if (formData.workflow_status === 'pending_review' && !product) {
        await createWorkflowTask('review_product', result.data.id, 'medium');
      }

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

  const getWorkflowStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'approved': return 'bg-blue-100 text-blue-800';
      case 'pending_review': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Tabs defaultValue="basic" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="basic">Basic Info</TabsTrigger>
        <TabsTrigger value="health">Health & Nutrition</TabsTrigger>
        <TabsTrigger value="workflow">Workflow</TabsTrigger>
      </TabsList>

      <form onSubmit={handleSubmit}>
        <TabsContent value="basic" className="space-y-4">
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
                  <SelectItem value="food">Food</SelectItem>
                  <SelectItem value="supplements">Supplements</SelectItem>
                  <SelectItem value="fitness_gear">Fitness Gear</SelectItem>
                  <SelectItem value="wellness">Wellness</SelectItem>
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

          <div className="grid grid-cols-2 gap-4">
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
        </TabsContent>

        <TabsContent value="health" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="health_score">Health Score (1-10)</Label>
              <Input
                id="health_score"
                type="number"
                min="1"
                max="10"
                value={formData.health_score}
                onChange={(e) => setFormData(prev => ({ ...prev, health_score: e.target.value }))}
              />
              {autoHealthScore && (
                <p className="text-sm text-gray-500 mt-1">
                  Auto-calculated: {autoHealthScore}
                </p>
              )}
            </div>
            <div className="flex items-center space-x-2 mt-6">
              <Checkbox
                id="manual_override"
                checked={formData.manual_override}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, manual_override: checked as boolean }))}
              />
              <Label htmlFor="manual_override">Manual Override</Label>
            </div>
          </div>

          <div>
            <Label htmlFor="ingredients">Ingredients (JSON array)</Label>
            <Textarea
              id="ingredients"
              value={formData.ingredients}
              onChange={(e) => setFormData(prev => ({ ...prev, ingredients: e.target.value }))}
              placeholder='["ingredient1", "ingredient2"]'
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={calculateAutoHealthScore}
            >
              Calculate Auto Health Score
            </Button>
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
        </TabsContent>

        <TabsContent value="workflow" className="space-y-4">
          <div>
            <Label htmlFor="workflow_status">Workflow Status</Label>
            <Select value={formData.workflow_status} onValueChange={(value) => setFormData(prev => ({ ...prev, workflow_status: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="pending_review">Pending Review</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="published">Published</SelectItem>
              </SelectContent>
            </Select>
            <Badge className={`mt-2 ${getWorkflowStatusColor(formData.workflow_status)}`}>
              {formData.workflow_status.replace('_', ' ').toUpperCase()}
            </Badge>
          </div>

          <div>
            <Label htmlFor="admin_notes">Admin Notes</Label>
            <Textarea
              id="admin_notes"
              value={formData.admin_notes}
              onChange={(e) => setFormData(prev => ({ ...prev, admin_notes: e.target.value }))}
              placeholder="Internal notes for admins..."
            />
          </div>

          {product && history.length > 0 && (
            <div>
              <Label>Workflow History</Label>
              <div className="border rounded-lg p-4 max-h-48 overflow-y-auto">
                {history.map((entry) => (
                  <div key={entry.id} className="border-b pb-2 mb-2 last:border-b-0">
                    <p className="text-sm">
                      <strong>Status:</strong> {entry.status_from || 'New'} → {entry.status_to}
                    </p>
                    {entry.notes && (
                      <p className="text-sm text-gray-600">{entry.notes}</p>
                    )}
                    <p className="text-xs text-gray-500">
                      {new Date(entry.created_at).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </TabsContent>

        <div className="flex gap-4 pt-6">
          <Button type="submit" disabled={loading}>
            {loading ? 'Saving...' : (product ? 'Update Product' : 'Create Product')}
          </Button>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </Tabs>
  );
};

export default EnhancedProductForm;
