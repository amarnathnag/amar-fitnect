
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import BlogList from '@/components/blog/BlogList';
import BlogPost from '@/components/blog/BlogPost';
import { blogPosts } from '@/data/blogPosts';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import NewBlogForm from '@/components/blog/NewBlogForm';
import CategoryHeader from '@/components/blog/CategoryHeader';
import { ArrowLeft } from 'lucide-react';

const Blog = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  const [showNewBlogForm, setShowNewBlogForm] = useState(false);
  const { user } = useAuth();
  
  // In a real app, this would come from user data
  const isPremiumUser = user?.isPremium || false;
  
  const { data: categories = [] } = useQuery({
    queryKey: ['blogCategories'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('blogs')
          .select('category')
          .order('category');
          
        if (error) throw new Error(error.message);
        
        // Extract unique categories
        const uniqueCategories = Array.from(
          new Set(data.map(item => item.category))
        );
        
        return uniqueCategories;
      } catch (error) {
        // Fallback to hardcoded categories in case of error
        return Array.from(new Set(blogPosts.map(post => post.category)));
      }
    }
  });
  
  // Find the specific post if postId is provided
  const currentPost = postId ? blogPosts.find(post => post.id === postId) : undefined;
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow py-12">
        <div className="container-custom">
          {currentPost ? (
            <div>
              <Button
                variant="ghost"
                onClick={() => navigate('/blog')}
                className="mb-6"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog
              </Button>
              <BlogPost post={currentPost} isPremiumUser={isPremiumUser} />
            </div>
          ) : (
            <>
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-3">Health & Wellness Blog</h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  Expert advice and evidence-based articles on nutrition, fitness, and managing health conditions.
                </p>
                
                <div className="flex flex-wrap items-center justify-center mt-6 gap-2">
                  <Tabs value={selectedCategory || "all"} onValueChange={(value) => setSelectedCategory(value === "all" ? undefined : value)}>
                    <TabsList className="bg-gray-100/80 dark:bg-gray-800/50 p-1">
                      <TabsTrigger value="all">All</TabsTrigger>
                      {categories.map((category) => (
                        <TabsTrigger key={category} value={category}>
                          {category}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </Tabs>
                  
                  {user && (
                    <Button 
                      className="ml-4 bg-health-primary" 
                      onClick={() => setShowNewBlogForm(!showNewBlogForm)}
                    >
                      {showNewBlogForm ? "Cancel" : "Create New Blog"}
                    </Button>
                  )}
                </div>
              </div>
              
              {showNewBlogForm && user && (
                <div className="mb-12">
                  <NewBlogForm onSuccess={() => setShowNewBlogForm(false)} />
                </div>
              )}
              
              <CategoryHeader category={selectedCategory} />
              
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
