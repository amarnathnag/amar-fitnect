
import React from 'react';
import { BlogPostCard, BlogPostProps } from './BlogPost';

interface BlogListProps {
  posts: BlogPostProps[];
  isPremiumUser: boolean;
  category?: string;
}

const BlogList = ({ posts, isPremiumUser, category }: BlogListProps) => {
  const filteredPosts = category 
    ? posts.filter(post => post.category === category) 
    : posts;
    
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredPosts.map((post) => (
        <BlogPostCard 
          key={post.id} 
          post={post} 
          isPremiumUser={isPremiumUser} 
        />
      ))}
    </div>
  );
};

export default BlogList;
