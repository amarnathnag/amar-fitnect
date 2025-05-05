
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import BlogList from '@/components/blog/BlogList';
import BlogPost from '@/components/blog/BlogPost';
import { blogPosts } from '@/data/blogPosts';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';

const Blog = () => {
  const { postId } = useParams<{ postId: string }>();
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  const { user } = useAuth();
  
  // In a real app, this would come from user data
  const isPremiumUser = false;
  
  const categories = Array.from(
    new Set(blogPosts.map(post => post.category))
  );
  
  // Find the specific post if postId is provided
  const currentPost = postId ? blogPosts.find(post => post.id === postId) : undefined;
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow py-12">
        <div className="container-custom">
          {currentPost ? (
            <BlogPost post={currentPost} isPremiumUser={isPremiumUser} />
          ) : (
            <>
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-3">Health & Wellness Blog</h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  Expert advice and evidence-based articles on nutrition, fitness, and managing health conditions.
                </p>
                
                <div className="flex flex-wrap justify-center mt-6 gap-2">
                  <Button 
                    variant={selectedCategory === undefined ? "default" : "outline"} 
                    onClick={() => setSelectedCategory(undefined)}
                    size="sm"
                  >
                    All
                  </Button>
                  
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      onClick={() => setSelectedCategory(category)}
                      size="sm"
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
              
              <BlogList 
                posts={blogPosts}
                isPremiumUser={isPremiumUser}
                category={selectedCategory}
              />
              
              <div className="mt-12 p-6 bg-health-light dark:bg-health-primary/10 rounded-xl text-center">
                <Badge className="mb-2">Premium Content</Badge>
                <h2 className="text-2xl font-bold mb-3">Unlock All Premium Articles</h2>
                <p className="mb-4 max-w-2xl mx-auto">
                  Get access to exclusive health content, personalized recommendations, and expert guidance with AmarHealth Premium.
                </p>
                <Button asChild>
                  <a href="/premium-ai">Go Premium Today</a>
                </Button>
              </div>
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Blog;
