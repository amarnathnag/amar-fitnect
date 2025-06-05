
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

interface ProductFiltersProps {
  categories: string[];
  onFilterChange: (filters: any) => void;
  currentFilters: {
    category?: string;
    sort?: string;
  };
}

const ProductFilters: React.FC<ProductFiltersProps> = ({ 
  categories, 
  onFilterChange, 
  currentFilters 
}) => {
  const handleCategoryChange = (category: string) => {
    onFilterChange({ category: category === 'all' ? '' : category });
  };

  const handleSortChange = (sort: string) => {
    onFilterChange({ sort });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label className="text-sm font-medium mb-3 block">Category</Label>
            <Select value={currentFilters.category || 'all'} onValueChange={handleCategoryChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-sm font-medium mb-3 block">Sort By</Label>
            <Select value={currentFilters.sort || 'health_score'} onValueChange={handleSortChange}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="health_score">Health Score (High to Low)</SelectItem>
                <SelectItem value="price_low">Price (Low to High)</SelectItem>
                <SelectItem value="price_high">Price (High to Low)</SelectItem>
                <SelectItem value="name">Name (A to Z)</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-sm font-medium mb-3 block">Health Features</Label>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="organic" 
                  onChange={(checked) => onFilterChange({ is_organic: checked })}
                />
                <Label htmlFor="organic" className="text-sm">Organic</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="vegetarian" 
                  onChange={(checked) => onFilterChange({ is_vegetarian: checked })}
                />
                <Label htmlFor="vegetarian" className="text-sm">Vegetarian</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="vegan" 
                  onChange={(checked) => onFilterChange({ is_vegan: checked })}
                />
                <Label htmlFor="vegan" className="text-sm">Vegan</Label>
              </div>
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium mb-3 block">Health Score Range</Label>
            <Slider
              defaultValue={[1, 10]}
              max={10}
              min={1}
              step={1}
              className="w-full"
              onValueChange={(value) => onFilterChange({ 
                min_health_score: value[0], 
                max_health_score: value[1] 
              })}
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>1</span>
              <span>10</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductFilters;
