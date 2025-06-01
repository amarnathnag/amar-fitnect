import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { 
  Heart, 
  MessageSquare, 
  Share2, 
  BookmarkPlus, 
  ThumbsUp, 
  Send, 
  User, 
  Users, 
  TrendingUp, 
  Lightbulb,
  Image as ImageIcon,
  PlusCircle,
  Loader2
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const Community = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("feed");
  const [postContent, setPostContent] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [commentInputs, setCommentInputs] = useState<{ [key: string]: string }>({});
  const queryClient = useQueryClient();

  // Fetch posts from Supabase
  const { data: posts = [], isLoading: postsLoading } = useQuery({
    queryKey: ['community-posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('community_posts')
        .select(`
          *,
          user_profiles (full_name)
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    }
  });

  // Fetch comments for posts
  const { data: comments = [], isLoading: commentsLoading } = useQuery({
    queryKey: ['community-comments'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('community_comments')
        .select(`
          *,
          user_profiles (full_name)
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    }
  });

  // Fetch likes
  const { data: likes = [], isLoading: likesLoading } = useQuery({
    queryKey: ['community-likes'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('community_likes')
        .select('*');
      
      if (error) throw error;
      return data || [];
    }
  });

  // Create a new post
  const createPostMutation = useMutation({
    mutationFn: async ({ title, content }: { title: string, content: string }) => {
      if (!user?.id) throw new Error("You must be logged in to create a post");
      
      const { data, error } = await supabase
        .from('community_posts')
        .insert({
          title,
          content,
          user_id: user.id
        })
        .select();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      setPostContent("");
      setPostTitle("");
      queryClient.invalidateQueries({ queryKey: ['community-posts'] });
      toast({
        title: "Post published!",
        description: "Your post has been shared with the community.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: (error as Error).message || "Failed to publish post",
        variant: "destructive"
      });
    }
  });

  // Like a post
  const likePostMutation = useMutation({
    mutationFn: async (postId: string) => {
      if (!user?.id) throw new Error("You must be logged in to like a post");
      
      // Check if already liked
      const existingLike = likes.find(like => 
        like.post_id === postId && like.user_id === user.id
      );
      
      if (existingLike) {
        // Unlike
        const { error } = await supabase
          .from('community_likes')
          .delete()
          .eq('id', existingLike.id);
        
        if (error) throw error;
        return { action: 'unlike', postId };
      } else {
        // Like
        const { error } = await supabase
          .from('community_likes')
          .insert({
            post_id: postId,
            user_id: user.id
          });
        
        if (error) throw error;
        return { action: 'like', postId };
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['community-likes'] });
      queryClient.invalidateQueries({ queryKey: ['community-posts'] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: (error as Error).message || "Failed to like post",
        variant: "destructive"
      });
    }
  });

  // Add comment to a post
  const addCommentMutation = useMutation({
    mutationFn: async ({ postId, content }: { postId: string, content: string }) => {
      if (!user?.id) throw new Error("You must be logged in to comment");
      if (!content.trim()) throw new Error("Comment cannot be empty");
      
      const { data, error } = await supabase
        .from('community_comments')
        .insert({
          post_id: postId,
          user_id: user.id,
          content
        })
        .select();
      
      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      // Clear the comment input for this post
      setCommentInputs(prev => ({
        ...prev,
        [variables.postId]: ''
      }));
      
      queryClient.invalidateQueries({ queryKey: ['community-comments'] });
      queryClient.invalidateQueries({ queryKey: ['community-posts'] });
      
      toast({
        title: "Comment added",
        description: "Your comment has been published.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: (error as Error).message || "Failed to add comment",
        variant: "destructive"
      });
    }
  });

  const handleSubmitPost = () => {
    if (!postTitle.trim()) {
      toast({
        title: "Missing title",
        description: "Please provide a title for your post",
        variant: "destructive"
      });
      return;
    }
    
    if (!postContent.trim()) {
      toast({
        title: "Missing content",
        description: "Please provide some content for your post",
        variant: "destructive"
      });
      return;
    }
    
    createPostMutation.mutate({ title: postTitle, content: postContent });
  };

  const handleLike = (postId: string) => {
    if (!user) {
      toast({
        title: "Login required",
        description: "Please log in to like posts",
        variant: "destructive"
      });
      return;
    }
    
    likePostMutation.mutate(postId);
  };

  const handleAddComment = (postId: string) => {
    const content = commentInputs[postId] || '';
    if (!content.trim()) return;
    
    addCommentMutation.mutate({ postId, content });
  };

  const handleCommentInputChange = (postId: string, value: string) => {
    setCommentInputs(prev => ({
      ...prev,
      [postId]: value
    }));
  };

  // Helper to get user initials 
  const getUserInitials = (name?: string) => {
    if (!name) return "U";
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  // Helper to check if user has liked a post
  const hasUserLikedPost = (postId: string) => {
    if (!user) return false;
    return likes.some(like => like.post_id === postId && like.user_id === user.id);
  };

  // Get comments for a specific post
  const getPostComments = (postId: string) => {
    return comments.filter(comment => comment.post_id === postId);
  };

  // Get like count for a post
  const getPostLikeCount = (postId: string) => {
    return likes.filter(like => like.post_id === postId).length;
  };

  // Generate time ago string
  const timeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (seconds < 60) return `${seconds} seconds ago`;
    
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
    
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`;
    
    const days = Math.floor(hours / 24);
    if (days < 30) return `${days} day${days === 1 ? '' : 's'} ago`;
    
    const months = Math.floor(days / 30);
    if (months < 12) return `${months} month${months === 1 ? '' : 's'} ago`;
    
    const years = Math.floor(months / 12);
    return `${years} year${years === 1 ? '' : 's'} ago`;
  };

  const trendingTopics = [
    {
      topic: "Mediterranean Diet",
      posts: 156,
      isNew: true
    },
    {
      topic: "Home Workout Challenge",
      posts: 124,
      isNew: false
    },
    {
      topic: "Mental Health and Fitness",
      posts: 98,
      isNew: true
    },
    {
      topic: "Protein-Rich Vegetarian Meals",
      posts: 87,
      isNew: false
    },
    {
      topic: "Weight Loss Success Stories",
      posts: 74,
      isNew: false
    }
  ];

  const activeGroups = [
    {
      name: "Weight Loss Support",
      members: 2453,
      avatar: "WL"
    },
    {
      name: "Vegetarian Recipe Sharing",
      members: 1876,
      avatar: "VR"
    },
    {
      name: "Morning Workout Club",
      members: 1245,
      avatar: "MW"
    },
    {
      name: "Beginners Fitness Journey",
      members: 978,
      avatar: "BF"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow py-10 bg-muted/30">
        <div className="container-custom">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Community</h1>
            <p className="text-lg text-muted-foreground">
              Connect with like-minded individuals on their health and fitness journeys.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:hidden col-span-12">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-3 w-full">
                  <TabsTrigger value="feed">Feed</TabsTrigger>
                  <TabsTrigger value="trending">Trending</TabsTrigger>
                  <TabsTrigger value="groups">Groups</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="hidden lg:block lg:col-span-3 space-y-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-medium">
                    <TrendingUp className="inline-block mr-2 h-5 w-5 text-health-primary" /> 
                    Trending Topics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 px-4 py-0">
                  {trendingTopics.map((topic, index) => (
                    <div key={index} className="flex justify-between items-center py-2">
                      <div>
                        <p className="font-medium hover:text-health-primary cursor-pointer">
                          #{topic.topic}
                          {topic.isNew && <span className="text-xs ml-2 text-health-primary">New</span>}
                        </p>
                        <p className="text-xs text-muted-foreground">{topic.posts} posts</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
                <CardFooter className="pt-2">
                  <Button variant="link" className="w-full justify-center text-health-primary">
                    View All Topics
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-medium">
                    <Users className="inline-block mr-2 h-5 w-5 text-health-primary" /> 
                    Active Groups
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 px-4 py-0">
                  {activeGroups.map((group, index) => (
                    <div key={index} className="flex items-center space-x-3 py-2">
                      <Avatar>
                        <AvatarFallback>{group.avatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium hover:text-health-primary cursor-pointer">{group.name}</p>
                        <p className="text-xs text-muted-foreground">{group.members} members</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
                <CardFooter className="pt-2">
                  <Button variant="link" className="w-full justify-center text-health-primary">
                    View All Groups
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-medium">
                    <Lightbulb className="inline-block mr-2 h-5 w-5 text-health-primary" /> 
                    Health Tip of the Day
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    Consistency over intensity: It's better to do 20 minutes of exercise every day 
                    than 2 hours once a week. Small, consistent habits lead to long-term success!
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <Tabs value={activeTab} className="lg:hidden">
                <TabsContent value="trending" className="mt-0 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Trending Topics</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {trendingTopics.map((topic, index) => (
                        <div key={index} className="flex justify-between items-center py-2 border-b last:border-0">
                          <div>
                            <p className="font-medium">
                              #{topic.topic}
                              {topic.isNew && <span className="text-xs ml-2 text-health-primary">New</span>}
                            </p>
                            <p className="text-xs text-muted-foreground">{topic.posts} posts</p>
                          </div>
                          <Button variant="outline" size="sm">View</Button>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="groups" className="mt-0 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Your Groups</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {activeGroups.map((group, index) => (
                        <div key={index} className="flex justify-between items-center py-2 border-b last:border-0">
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              <AvatarFallback>{group.avatar}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{group.name}</p>
                              <p className="text-xs text-muted-foreground">{group.members} members</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">Join</Button>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              <Card className={activeTab === "feed" ? "block" : "hidden lg:block"}>
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarFallback>{user ? getUserInitials(user.name) : "?"}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <CardTitle className="text-base font-medium">Share with the community</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Input
                      placeholder="Post title"
                      value={postTitle}
                      onChange={(e) => setPostTitle(e.target.value)}
                      className="mb-2"
                    />
                    <Textarea 
                      placeholder="What's on your mind?" 
                      className="min-h-[80px]"
                      value={postContent}
                      onChange={(e) => setPostContent(e.target.value)}
                    />
                    <div className="flex justify-between items-center">
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <ImageIcon className="h-4 w-4 mr-2" /> Photo
                        </Button>
                        <Button variant="outline" size="sm">
                          <Users className="h-4 w-4 mr-2" /> Tag People
                        </Button>
                      </div>
                      <Button 
                        onClick={handleSubmitPost} 
                        disabled={!postTitle.trim() || !postContent.trim() || createPostMutation.isPending || !user}
                        className="bg-health-primary hover:bg-health-dark"
                      >
                        {createPostMutation.isPending ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                            Posting...
                          </>
                        ) : "Post"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {!user && (
                <Card className="bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800">
                  <CardContent className="pt-6 pb-6">
                    <div className="text-center">
                      <h3 className="text-xl font-bold mb-2">Join the Community</h3>
                      <p className="mb-4">Login or create an account to post, comment and like.</p>
                      <Button asChild>
                        <a href="/auth">Sign In / Sign Up</a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {(activeTab === "feed" || activeTab === "trending" || activeTab === "groups") && (
                <div className="space-y-6">
                  {postsLoading ? (
                    <div className="flex justify-center py-12">
                      <Loader2 className="h-8 w-8 animate-spin text-health-primary" />
                    </div>
                  ) : posts.length > 0 ? (
                    posts.map(post => {
                      const postComments = getPostComments(post.id);
                      const likeCount = getPostLikeCount(post.id);
                      const isLiked = hasUserLikedPost(post.id);
                      
                      return (
                        <Card key={post.id} className="overflow-hidden">
                          <CardHeader className="pb-3">
                            <div className="flex justify-between items-start">
                              <div className="flex items-center space-x-4">
                                <Avatar>
                                  <AvatarFallback>
                                    {getUserInitials(post.user_profiles?.full_name || 'Anonymous')}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <CardTitle className="text-base font-medium">
                                    {post.user_profiles?.full_name || 'Anonymous'}
                                  </CardTitle>
                                  <CardDescription className="text-xs">
                                    {timeAgo(post.created_at)}
                                  </CardDescription>
                                </div>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="pb-3">
                            <h3 className="text-lg font-medium mb-2">{post.title}</h3>
                            <p className="text-sm mb-4">{post.content}</p>
                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                              <span>{likeCount} {likeCount === 1 ? 'like' : 'likes'}</span>
                              <span>{postComments.length} {postComments.length === 1 ? 'comment' : 'comments'}</span>
                            </div>
                          </CardContent>
                          <Separator />
                          <CardFooter className="p-3">
                            <div className="flex justify-between w-full">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => handleLike(post.id)}
                                className={isLiked ? "text-health-primary" : ""}
                                disabled={likePostMutation.isPending}
                              >
                                <Heart className={`h-4 w-4 mr-2 ${isLiked ? "fill-health-primary" : ""}`} /> 
                                Like
                              </Button>
                              <Button variant="ghost" size="sm">
                                <MessageSquare className="h-4 w-4 mr-2" /> Comment
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Share2 className="h-4 w-4 mr-2" /> Share
                              </Button>
                              <Button variant="ghost" size="sm">
                                <BookmarkPlus className="h-4 w-4 mr-2" /> Save
                              </Button>
                            </div>
                          </CardFooter>
                          
                          {postComments.length > 0 && (
                            <div className="px-4 pb-4 space-y-4">
                              <Separator />
                              <div className="space-y-4 pt-2">
                                {postComments.map((comment) => (
                                  <div key={comment.id} className="flex items-start space-x-3">
                                    <Avatar className="h-7 w-7">
                                      <AvatarFallback className="text-xs">
                                        {getUserInitials(comment.user_profiles?.full_name || 'Anonymous')}
                                      </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                      <div className="bg-muted p-3 rounded-md">
                                        <div className="flex justify-between items-center mb-1">
                                          <p className="text-sm font-medium">
                                            {comment.user_profiles?.full_name || 'Anonymous'}
                                          </p>
                                          <p className="text-xs text-muted-foreground">
                                            {timeAgo(comment.created_at)}
                                          </p>
                                        </div>
                                        <p className="text-sm">{comment.content}</p>
                                      </div>
                                      <div className="flex items-center mt-1 text-xs text-muted-foreground">
                                        <button className="hover:text-health-primary mr-4">Like</button>
                                        <button className="hover:text-health-primary">Reply</button>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {user && (
                            <div className="px-4 pb-4 pt-2">
                              <div className="flex items-center space-x-3">
                                <Avatar className="h-8 w-8">
                                  <AvatarFallback>{getUserInitials(user.name)}</AvatarFallback>
                                </Avatar>
                                <div className="relative flex-1">
                                  <Input 
                                    placeholder="Add a comment..." 
                                    className="pr-10"
                                    value={commentInputs[post.id] || ''}
                                    onChange={(e) => handleCommentInputChange(post.id, e.target.value)}
                                    onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
                                      if (e.key === 'Enter') {
                                        handleAddComment(post.id);
                                      }
                                    }}
                                  />
                                  <button 
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-health-primary"
                                    onClick={() => handleAddComment(post.id)}
                                    disabled={addCommentMutation.isPending}
                                  >
                                    {addCommentMutation.isPending ? (
                                      <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                      <Send className="h-4 w-4" />
                                    )}
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                        </Card>
                      );
                    })
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">No posts yet. Be the first to share!</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="hidden lg:block lg:col-span-3 space-y-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-medium">Your Profile</CardTitle>
                </CardHeader>
                <CardContent className="px-6">
                  <div className="flex flex-col items-center text-center">
                    <Avatar className="h-20 w-20 mb-4">
                      <AvatarFallback className="text-xl">
                        {user ? getUserInitials(user.name) : "?"}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="text-lg font-medium">
                      {user ? user.name || user.email : "Guest User"}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {user ? "Member since 2023" : "Not signed in"}
                    </p>
                    <Button variant="outline" className="w-full" asChild>
                      <a href={user ? "/profile" : "/auth"}>
                        <User className="mr-2 h-4 w-4" /> 
                        {user ? "View Profile" : "Sign In"}
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-medium">Suggested Connections</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 px-4 py-0">
                  {[
                    { name: "Emily Wilson", role: "Yoga Instructor", avatar: "EW" },
                    { name: "James Lee", role: "Nutritionist", avatar: "JL" },
                    { name: "Sophia Clark", role: "Fitness Enthusiast", avatar: "SC" }
                  ].map((person, index) => (
                    <div key={index} className="flex items-center justify-between py-2">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarFallback>{person.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{person.name}</p>
                          <p className="text-xs text-muted-foreground">{person.role}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <PlusCircle className="h-3 w-3 mr-1" /> Follow
                      </Button>
                    </div>
                  ))}
                </CardContent>
                <CardFooter className="pt-2">
                  <Button variant="link" className="w-full justify-center text-health-primary">
                    View More
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-medium">Community Guidelines</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-2">
                    <li>• Be respectful and supportive of others</li>
                    <li>• No promotion of extreme diets or unhealthy practices</li>
                    <li>• Share evidence-based information</li>
                    <li>• Respect privacy and confidentiality</li>
                    <li>• Report any concerning content to moderators</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Community;
