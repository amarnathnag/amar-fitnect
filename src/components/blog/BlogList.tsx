
import React, { useState } from 'react';
import { BlogPostCard, BlogPostProps } from './BlogPost';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';

interface BlogListProps {
  posts: BlogPostProps[];
  isPremiumUser: boolean;
  category?: string;
}

const fetchBlogsFromSupabase = async (category?: string) => {
  let query = supabase.from('blogs')
    .select('*')
    .order('published_at', { ascending: false });
  
  if (category) {
    query = query.eq('category', category);
  }
  
  const { data, error } = await query;
  
  if (error) {
    throw new Error(error.message);
  }
  
  return data;
};

const BlogList = ({ posts: initialPosts, isPremiumUser, category }: BlogListProps) => {
  const { toast } = useToast();
  const [useSupabase, setUseSupabase] = useState(false);
  
  const { data: supabasePosts, isLoading, error } = useQuery({
    queryKey: ['blogs', category, useSupabase],
    queryFn: () => useSupabase ? fetchBlogsFromSupabase(category) : null,
    enabled: useSupabase
  });
  
  // Use initial posts data if not using Supabase or if loading
  const filteredPosts = useSupabase && supabasePosts 
    ? supabasePosts 
    : category 
      ? initialPosts.filter(post => post.category === category)
      : initialPosts;
  
  if (error) {
    toast({
      title: "Error loading blogs",
      description: (error as Error).message,
      variant: "destructive"
    });
  }
  
  return (
    <div className="space-y-6">
      <div className="flex justify-end mb-6">
        <button 
          onClick={() => setUseSupabase(!useSupabase)}
          className="text-sm bg-health-primary/10 text-health-primary hover:bg-health-primary/20 px-3 py-1 rounded-full"
        >
          {useSupabase ? "Switch to demo data" : "Fetch from Supabase"}
        </button>
      </div>
      
      {isLoading && useSupabase ? (
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-health-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-2 text-gray-600 dark:text-gray-300">Loading blogs...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <BlogPostCard 
              key={post.id} 
              post={post} 
              isPremiumUser={isPremiumUser} 
            />
          ))}
          
          {filteredPosts.length === 0 && (
            <div className="col-span-3 text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">No blog posts found{category ? ` in category "${category}"` : ''}.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BlogList;
