import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Heart, Leaf, Award, Star } from 'lucide-react';
import { healthScoreRanges, dietaryPreferences } from '@/data/productCategories';

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
    console.log('Category changed to:', category);
    onFilterChange({ 
      ...currentFilters, 
      category: category === 'all' ? '' : category 
    });
  };

  const handleSortChange = (sort: string) => {
    console.log('Sort changed to:', sort);
    onFilterChange({ ...currentFilters, sortBy: sort });
  };

  const handleHealthScoreRangeChange = (range: string) => {
    if (range === 'all') {
      onFilterChange({ 
        ...currentFilters, 
        minHealthScore: undefined,
        maxHealthScore: undefined 
      });
    } else {
      const selectedRange = healthScoreRanges.find(r => r.label === range);
      if (selectedRange) {
        onFilterChange({ 
          ...currentFilters, 
          minHealthScore: selectedRange.min,
          maxHealthScore: selectedRange.max
        });
      }
    }
  };

  const handleHealthScoreChange = (values: number[]) => {
    console.log('Health score range changed to:', values);
    onFilterChange({ 
      ...currentFilters, 
      minHealthScore: values[0],
      maxHealthScore: values[1]
    });
  };

  const handleDietaryChange = (key: string, checked: boolean) => {
    console.log(`Dietary filter ${key} changed to:`, checked);
    onFilterChange({ ...currentFilters, [key]: checked });
  };

  const categoryLabels: Record<string, string> = {
    dairy: 'Dairy & Alternatives',
    bakery: 'Bakery & Breads',
    beverages: 'Beverages',
    snacks: 'Snacks & Health Bars',
    grains: 'Cereals & Grains',
    oils: 'Healthy Oils',
    spices: 'Spices & Condiments',
    frozen: 'Frozen & Convenience',
    personal_care: 'Personal Care & Wellness',
    household: 'Household Essentials',
    supplements: 'Health Supplements',
    healthy_snacks: 'Healthy Snacks',
    health_supplements: 'Health Supplements',
    special_collections: 'Special Collections',
    protein: 'Protein Sources',
    breakfast: 'Breakfast & Cereals',
    sweeteners: 'Natural Sweeteners',
    grocery: 'Grocery Essentials'
  };

  const getCurrentHealthScoreRange = () => {
    const min = currentFilters.minHealthScore || 0;
    const max = currentFilters.maxHealthScore || 10;
    
    const range = healthScoreRanges.find(r => r.min === min && r.max === max);
    return range ? range.label : 'Custom Range';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />
            Categories
          </CardTitle>
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
            value={currentFilters.sortBy || 'health_score'} 
            onValueChange={handleSortChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="health_score">
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-green-600" />
                  Health Score
                </div>
              </SelectItem>
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
          <CardTitle className="text-lg flex items-center gap-2">
            <Award className="h-5 w-5 text-green-600" />
            Health Score Filter
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-sm font-medium mb-2 block">Quick Select</Label>
            <Select 
              value={getCurrentHealthScoreRange()} 
              onValueChange={handleHealthScoreRangeChange}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Health Scores</SelectItem>
                {healthScoreRanges.slice(1).map((range) => (
                  <SelectItem key={range.label} value={range.label}>
                    {range.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label className="text-sm font-medium mb-2 block">Custom Range</Label>
            <div className="px-2">
              <Slider
                value={[currentFilters.minHealthScore || 0, currentFilters.maxHealthScore || 10]}
                max={10}
                min={0}
                step={1}
                onValueChange={handleHealthScoreChange}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>{currentFilters.minHealthScore || 0}/10</span>
                <span>{currentFilters.maxHealthScore || 10}/10</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Heart className="h-5 w-5 text-red-500" />
            Health & Dietary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {dietaryPreferences.map((pref) => (
            <div key={pref.key} className="flex items-center space-x-3">
              <Checkbox 
                id={pref.key}
                checked={currentFilters[pref.key] || false}
                onCheckedChange={(checked) => handleDietaryChange(pref.key, checked as boolean)}
              />
              <Label htmlFor={pref.key} className="flex items-center gap-2 cursor-pointer">
                <span>{pref.icon}</span>
                {pref.label}
              </Label>
              {currentFilters[pref.key] && (
                <Badge variant="secondary" className="text-xs">
                  Active
                </Badge>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Filter Summary */}
      {(currentFilters.minHealthScore > 0 || currentFilters.maxHealthScore < 10 || 
        currentFilters.isOrganic || currentFilters.isVegan || currentFilters.isVegetarian) && (
        <Card className="border-green-200 bg-green-50 dark:bg-green-900/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-green-700 dark:text-green-300">Active Filters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {(currentFilters.minHealthScore > 0 || currentFilters.maxHealthScore < 10) && (
              <Badge variant="outline" className="text-green-700 border-green-300">
                Health: {currentFilters.minHealthScore || 0}-{currentFilters.maxHealthScore || 10}
              </Badge>
            )}
            {currentFilters.isOrganic && (
              <Badge variant="outline" className="text-green-700 border-green-300">
                🌱 Organic
              </Badge>
            )}
            {currentFilters.isVegan && (
              <Badge variant="outline" className="text-green-700 border-green-300">
                🌿 Vegan
              </Badge>
            )}
            {currentFilters.isVegetarian && (
              <Badge variant="outline" className="text-green-700 border-green-300">
                🥬 Vegetarian
              </Badge>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProductFilters;
