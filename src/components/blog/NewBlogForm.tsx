
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useQueryClient } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';

interface BlogFormValues {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: string;
  isPremium: boolean;
}

interface NewBlogFormProps {
  onSuccess?: () => void;
}

const NewBlogForm: React.FC<NewBlogFormProps> = ({ onSuccess }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<BlogFormValues>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  
  const onSubmit = async (data: BlogFormValues) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "You must be logged in to create a blog post",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Create the blog post
      const { error } = await supabase.from('blogs').insert({
        title: data.title,
        excerpt: data.excerpt,
        content: data.content,
        category: data.category,
        read_time: data.readTime,
        is_premium: data.isPremium,
        author_id: user.id
      });
      
      if (error) throw error;
      
      toast({
        title: "Blog post created",
        description: "Your blog post has been published successfully"
      });
      
      // Invalidate and refetch blogs data
      queryClient.invalidateQueries({
        queryKey: ['blogs']
      });
      
      queryClient.invalidateQueries({
        queryKey: ['blogCategories']
      });
      
      // Reset the form
      reset();
      
      // Call onSuccess callback if provided
      if (onSuccess) onSuccess();
      
    } catch (error) {
      console.error("Error creating blog post:", error);
      toast({
        title: "Error creating blog post",
        description: (error as Error).message || "Something went wrong",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Card className="shadow-lg border-health-primary/20">
      <CardHeader className="bg-gradient-to-r from-health-primary/5 to-health-primary/10">
        <CardTitle className="text-2xl">Create New Blog Post</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">Blog Title</Label>
              <Input 
                id="title"
                placeholder="Enter a catchy title"
                {...register("title", { required: "Title is required" })}
                className={errors.title ? "border-red-500" : ""}
              />
              {errors.title && <p className="text-red-500 text-xs">{errors.title.message}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input 
                id="category"
                placeholder="e.g., Nutrition, Fitness, Mental Health"
                {...register("category", { required: "Category is required" })}
                className={errors.category ? "border-red-500" : ""}
              />
              {errors.category && <p className="text-red-500 text-xs">{errors.category.message}</p>}
            </div>
          </div>
          
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="readTime">Read Time</Label>
              <Input 
                id="readTime"
                placeholder="e.g., 5 min"
                {...register("readTime", { required: "Read time is required" })}
                className={errors.readTime ? "border-red-500" : ""}
              />
              {errors.readTime && <p className="text-red-500 text-xs">{errors.readTime.message}</p>}
            </div>
            
            <div className="flex items-center space-x-2 pt-8">
              <Switch id="isPremium" {...register("isPremium")} />
              <Label htmlFor="isPremium">Premium Content</Label>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea 
              id="excerpt"
              placeholder="A brief description that appears in the blog list"
              rows={2}
              {...register("excerpt", { required: "Excerpt is required" })}
              className={errors.excerpt ? "border-red-500" : ""}
            />
            {errors.excerpt && <p className="text-red-500 text-xs">{errors.excerpt.message}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea 
              id="content"
              placeholder="Write your blog content here..."
              rows={10}
              {...register("content", { required: "Content is required" })}
              className={errors.content ? "border-red-500" : ""}
            />
            {errors.content && <p className="text-red-500 text-xs">{errors.content.message}</p>}
          </div>
          
          <div className="flex justify-end">
            <Button 
              type="submit" 
              className="bg-health-primary hover:bg-health-dark"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Publishing...
                </>
              ) : "Publish Blog Post"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default NewBlogForm;
