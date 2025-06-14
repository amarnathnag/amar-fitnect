
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';

interface ProductFiltersProps {
  categories: string[];
  onFilterChange: (filters: any) => void;
  currentFilters: any;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({ 
  categories, 
  onFilterChange, 
  currentFilters 
}) => {
  const handleCategoryChange = (category: string) => {
    onFilterChange({ 
      ...currentFilters, 
      category: category === 'all' ? '' : category 
    });
  };

  const handleSortChange = (sort: string) => {
    onFilterChange({ ...currentFilters, sort });
  };

  const handleHealthScoreChange = (values: number[]) => {
    onFilterChange({ 
      ...currentFilters, 
      minHealthScore: values[0],
      maxHealthScore: values[1]
    });
  };

  const handleDietaryChange = (key: string, checked: boolean) => {
    onFilterChange({ ...currentFilters, [key]: checked });
  };

  const categoryLabels: Record<string, string> = {
    dairy: 'Dairy & Alternatives',
    bakery: 'Bakery & Breads',
    beverages: 'Beverages',
    snacks: 'Snacks & Health Bars',
    grains: 'Cereals & Grains',
    oils: 'Oils & Fats',
    spices: 'Spices & Condiments',
    frozen: 'Frozen & Convenience',
    personal_care: 'Personal Care & Wellness',
    household: 'Household Essentials',
    supplements: 'Supplements',
    nuts: 'Nuts & Seeds',
    vegetables: 'Vegetables',
    fruits: 'Fruits',
    seafood: 'Seafood'
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <Select 
            value={currentFilters.category || 'all'} 
            onValueChange={handleCategoryChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {categoryLabels[category] || category.charAt(0).toUpperCase() + category.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Sort By</CardTitle>
        </CardHeader>
        <CardContent>
          <Select 
            value={currentFilters.sort || 'health_score'} 
            onValueChange={handleSortChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="health_score">Health Score</SelectItem>
              <SelectItem value="price_low">Price: Low to High</SelectItem>
              <SelectItem value="price_high">Price: High to Low</SelectItem>
              <SelectItem value="name">Name A-Z</SelectItem>
              <SelectItem value="rating">Customer Rating</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Health Score Range</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="px-2">
            <Slider
              defaultValue={[0, 10]}
              max={10}
              min={0}
              step={1}
              onValueChange={handleHealthScoreChange}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span>0</span>
              <span>10</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Dietary Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="organic"
              checked={currentFilters.isOrganic || false}
              onCheckedChange={(checked) => handleDietaryChange('isOrganic', checked as boolean)}
            />
            <Label htmlFor="organic">Organic</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="vegetarian"
              checked={currentFilters.isVegetarian || false}
              onCheckedChange={(checked) => handleDietaryChange('isVegetarian', checked as boolean)}
            />
            <Label htmlFor="vegetarian">Vegetarian</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="vegan"
              checked={currentFilters.isVegan || false}
              onCheckedChange={(checked) => handleDietaryChange('isVegan', checked as boolean)}
            />
            <Label htmlFor="vegan">Vegan</Label>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductFilters;
