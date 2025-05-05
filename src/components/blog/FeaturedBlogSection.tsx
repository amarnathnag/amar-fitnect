
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { blogPosts } from '@/data/blogPosts';
import { BlogPostCard } from './BlogPost';

const FeaturedBlogSection = () => {
  const featuredPosts = blogPosts.slice(0, 3);
  
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800/30">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="h-5 w-5 text-health-primary" />
              <h2 className="text-2xl md:text-3xl font-bold">Health & Wellness Blog</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Evidence-based articles and tips for better health
            </p>
          </div>
          <Button asChild variant="outline" className="mt-4 md:mt-0">
            <Link to="/blog" className="flex items-center">
              View All Articles <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredPosts.map(post => (
            <BlogPostCard 
              key={post.id} 
              post={post} 
              isPremiumUser={false} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedBlogSection;
