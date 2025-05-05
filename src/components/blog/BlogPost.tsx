
import React from 'react';
import { ArrowRight, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

export interface BlogPostProps {
  id: string;
  title: string;
  excerpt: string;
  content?: React.ReactNode;
  date: string;
  category: string;
  readTime: string;
  isPremium?: boolean;
  image?: string;
}

interface BlogPostCardProps {
  post: BlogPostProps;
  isPremiumUser: boolean;
}

export const BlogPostCard = ({ post, isPremiumUser }: BlogPostCardProps) => {
  const { id, title, excerpt, date, category, readTime, isPremium, image } = post;
  
  return (
    <Card className="h-full flex flex-col overflow-hidden hover:shadow-md transition-shadow">
      {image && (
        <div className="relative h-48 overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover" 
          />
          {isPremium && !isPremiumUser && (
            <div className="absolute top-0 right-0 bg-amber-500 text-white px-2 py-1 text-xs font-medium">
              Premium
            </div>
          )}
        </div>
      )}
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center mb-2">
          <Badge variant="outline" className="text-xs font-normal">
            {category}
          </Badge>
          <div className="flex items-center text-xs text-gray-500">
            <Calendar className="h-3 w-3 mr-1" />
            {date}
          </div>
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription className="text-sm text-gray-500">
          {readTime} read
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-4 flex-grow">
        <p className="text-gray-700 dark:text-gray-300">
          {excerpt}
        </p>
      </CardContent>
      <CardFooter>
        <Button 
          variant="ghost" 
          className="text-health-primary hover:text-health-dark p-0"
          asChild
        >
          <Link to={isPremium && !isPremiumUser ? "/premium-ai" : `/blog/${id}`}>
            {isPremium && !isPremiumUser ? "Unlock with Premium" : "Read More"} <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

const BlogPost = ({ post, isPremiumUser }: BlogPostCardProps) => {
  const { title, content, date, category, readTime, isPremium } = post;

  if (isPremium && !isPremiumUser) {
    return (
      <div className="max-w-3xl mx-auto py-8">
        <div className="text-center p-8 border border-amber-200 rounded-lg bg-amber-50 dark:bg-amber-900/20 dark:border-amber-800/30">
          <h2 className="text-2xl font-bold mb-4">Premium Content</h2>
          <p className="mb-6">
            This article is only available to premium subscribers. Upgrade to access this and all other premium articles.
          </p>
          <Button asChild>
            <Link to="/premium-ai">Upgrade to Premium</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8">
      <Badge variant="outline" className="mb-4">
        {category}
      </Badge>
      <h1 className="text-3xl md:text-4xl font-bold mb-3">{title}</h1>
      <div className="flex items-center text-gray-600 dark:text-gray-400 mb-8">
        <Calendar className="h-4 w-4 mr-2" />
        <span className="mr-4">{date}</span>
        <span>{readTime} read</span>
      </div>
      <div className="prose dark:prose-invert max-w-none">
        {content}
      </div>
    </div>
  );
};

export default BlogPost;
