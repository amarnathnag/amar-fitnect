
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X, Sparkles } from 'lucide-react';

interface ProductSearchProps {
  onSearch: (query: string) => void;
  initialValue?: string;
}

const ProductSearch: React.FC<ProductSearchProps> = ({ onSearch, initialValue = '' }) => {
  const [query, setQuery] = useState(initialValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  const popularSearches = [
    'Organic milk', 'Brown bread', 'Olive oil', 'Greek yogurt', 'Quinoa', 'Honey'
  ];

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            type="text"
            placeholder="Search for healthy products, brands, or categories..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-12 pr-24 h-14 text-lg rounded-xl border-gray-200 focus:border-green-400 focus:ring-green-400 bg-white dark:bg-gray-800 dark:border-gray-600"
          />
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-2">
            {query && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleClear}
                className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
            <Button 
              type="submit" 
              size="sm"
              className="h-10 px-6 bg-green-500 hover:bg-green-600 text-white rounded-lg"
            >
              Search
            </Button>
          </div>
        </div>
      </form>

      {/* Popular Searches */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <Sparkles className="h-4 w-4" />
          <span>Popular:</span>
        </div>
        {popularSearches.map((search, index) => (
          <button
            key={index}
            onClick={() => {
              setQuery(search);
              onSearch(search);
            }}
            className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-full transition-colors"
          >
            {search}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductSearch;
