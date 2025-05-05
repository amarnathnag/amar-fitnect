
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { blogPosts } from '@/data/blogPosts';

const PremiumBlogPreview = () => {
  // Get only premium blog posts
  const premiumPosts = blogPosts.filter(post => post.isPremium).slice(0, 2);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex items-center justify-between">
          Premium Health Articles
          <Link 
            to="/blog" 
            className="text-sm text-health-primary hover:text-health-dark flex items-center"
          >
            View All <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {premiumPosts.map(post => (
            <Link 
              key={post.id} 
              to={`/blog/${post.id}`} 
              className="block hover:bg-gray-50 dark:hover:bg-gray-800/50 p-3 rounded-lg transition-colors"
            >
              <h3 className="font-medium mb-1">{post.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{post.excerpt}</p>
              <div className="mt-2 flex justify-between items-center text-xs text-gray-500">
                <span>{post.category}</span>
                <span>{post.readTime} read</span>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PremiumBlogPreview;
