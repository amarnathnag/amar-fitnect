
import React, { useState } from 'react';
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
  Image,
  PlusCircle
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const Community = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("feed");
  const [postContent, setPostContent] = useState("");

  // Mock data for community posts
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: {
        name: "Sarah Johnson",
        avatar: "SJ",
        role: "Fitness Enthusiast"
      },
      content: "Just completed my first month on the weight loss program and I've lost 5kg! So grateful for this community's support and motivation.",
      image: null,
      likes: 24,
      comments: 7,
      time: "2 hours ago",
      isLiked: false,
      isSaved: false,
      commentsList: [
        {
          user: {
            name: "Mark Wilson",
            avatar: "MW"
          },
          content: "That's amazing progress! Keep it up!",
          time: "1 hour ago",
          likes: 3
        },
        {
          user: {
            name: "Lisa Rodriguez",
            avatar: "LR"
          },
          content: "What was the hardest part? I'm just getting started myself.",
          time: "45 min ago",
          likes: 2
        }
      ]
    },
    {
      id: 2,
      user: {
        name: "David Chen",
        avatar: "DC",
        role: "Nutritionist"
      },
      content: "Tip of the day: Adding a handful of spinach to your morning smoothie is an easy way to boost your nutrient intake without changing the taste much!",
      image: "https://images.unsplash.com/photo-1610970881699-44a5587cabec?q=80&w=1200&auto=format&fit=crop",
      likes: 42,
      comments: 12,
      time: "5 hours ago",
      isLiked: true,
      isSaved: true,
      commentsList: [
        {
          user: {
            name: "Emma Parker",
            avatar: "EP"
          },
          content: "I do this every day! Also try adding a little bit of ginger for flavor and digestion benefits.",
          time: "4 hours ago",
          likes: 8
        }
      ]
    },
    {
      id: 3,
      user: {
        name: "Michael Thompson",
        avatar: "MT",
        role: "Fitness Coach"
      },
      content: "Question for the community: What's your go-to exercise when you only have 15 minutes to work out?",
      image: null,
      likes: 18,
      comments: 24,
      time: "Yesterday",
      isLiked: false,
      isSaved: false,
      commentsList: [
        {
          user: {
            name: "Alex Johnson",
            avatar: "AJ"
          },
          content: "Burpees! They're a full-body workout and get your heart rate up quickly.",
          time: "22 hours ago",
          likes: 5
        },
        {
          user: {
            name: "Taylor Swift",
            avatar: "TS"
          },
          content: "I do a quick HIIT routine - jumping jacks, squats, push-ups, and mountain climbers.",
          time: "21 hours ago",
          likes: 7
        }
      ]
    }
  ]);

  const handleLike = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          isLiked: !post.isLiked
        };
      }
      return post;
    }));
  };

  const handleSave = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isSaved: !post.isSaved
        };
      }
      return post;
    }));
    
    toast({
      title: "Post saved!",
      description: "You can find it in your saved items.",
    });
  };

  const handleAddComment = (postId, comment) => {
    if (!comment.trim()) return;
    
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: post.comments + 1,
          commentsList: [
            {
              user: {
                name: "Alex Johnson",
                avatar: "AJ"
              },
              content: comment,
              time: "Just now",
              likes: 0
            },
            ...post.commentsList
          ]
        };
      }
      return post;
    }));
  };

  const handleSubmitPost = () => {
    if (!postContent.trim()) return;
    
    const newPost = {
      id: posts.length + 1,
      user: {
        name: "Alex Johnson",
        avatar: "AJ",
        role: "Member"
      },
      content: postContent,
      image: null,
      likes: 0,
      comments: 0,
      time: "Just now",
      isLiked: false,
      isSaved: false,
      commentsList: []
    };
    
    setPosts([newPost, ...posts]);
    setPostContent("");
    
    toast({
      title: "Post published!",
      description: "Your post has been shared with the community.",
    });
  };

  // Mock data for trending topics
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

  // Mock data for active groups
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
            {/* Left Sidebar - Mobile Tabs */}
            <div className="lg:hidden col-span-12">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-3 w-full">
                  <TabsTrigger value="feed">Feed</TabsTrigger>
                  <TabsTrigger value="trending">Trending</TabsTrigger>
                  <TabsTrigger value="groups">Groups</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Left Sidebar - Desktop */}
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

            {/* Main Content */}
            <div className="lg:col-span-6 space-y-6">
              {/* Mobile Tabs Content */}
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

              {/* Create Post */}
              <Card className={activeTab === "feed" ? "block" : "hidden lg:block"}>
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarFallback>AJ</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <CardTitle className="text-base font-medium">Share with the community</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Textarea 
                    placeholder="What's on your mind?" 
                    className="mb-4 min-h-[80px]"
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                  />
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Image className="h-4 w-4 mr-2" /> Photo
                      </Button>
                      <Button variant="outline" size="sm">
                        <Users className="h-4 w-4 mr-2" /> Tag People
                      </Button>
                    </div>
                    <Button onClick={handleSubmitPost} disabled={!postContent.trim()}>
                      Post
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Feed */}
              {(activeTab === "feed" || activeTab === "trending" || activeTab === "groups") && (
                <div className="space-y-6">
                  {posts.map(post => (
                    <Card key={post.id} className="overflow-hidden">
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center space-x-4">
                            <Avatar>
                              <AvatarFallback>{post.user.avatar}</AvatarFallback>
                            </Avatar>
                            <div>
                              <CardTitle className="text-base font-medium">{post.user.name}</CardTitle>
                              <CardDescription className="text-xs">{post.user.role} • {post.time}</CardDescription>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-3">
                        <p className="text-sm mb-4">{post.content}</p>
                        {post.image && (
                          <div className="relative aspect-video w-full overflow-hidden rounded-md mb-4">
                            <img 
                              src={post.image} 
                              alt={`Post by ${post.user.name}`} 
                              className="object-cover w-full h-full"
                            />
                          </div>
                        )}
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>{post.likes} likes</span>
                          <span>{post.comments} comments</span>
                        </div>
                      </CardContent>
                      <Separator />
                      <CardFooter className="p-3">
                        <div className="flex justify-between w-full">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleLike(post.id)}
                            className={post.isLiked ? "text-health-primary" : ""}
                          >
                            <Heart className={`h-4 w-4 mr-2 ${post.isLiked ? "fill-health-primary" : ""}`} /> 
                            Like
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MessageSquare className="h-4 w-4 mr-2" /> Comment
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Share2 className="h-4 w-4 mr-2" /> Share
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleSave(post.id)}
                            className={post.isSaved ? "text-health-primary" : ""}
                          >
                            <BookmarkPlus className={`h-4 w-4 mr-2 ${post.isSaved ? "fill-health-primary" : ""}`} /> 
                            Save
                          </Button>
                        </div>
                      </CardFooter>
                      
                      {post.commentsList.length > 0 && (
                        <div className="px-4 pb-4 space-y-4">
                          <Separator />
                          <div className="space-y-4 pt-2">
                            {post.commentsList.map((comment, index) => (
                              <div key={index} className="flex items-start space-x-3">
                                <Avatar className="h-7 w-7">
                                  <AvatarFallback className="text-xs">{comment.user.avatar}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <div className="bg-muted p-3 rounded-md">
                                    <div className="flex justify-between items-center mb-1">
                                      <p className="text-sm font-medium">{comment.user.name}</p>
                                      <p className="text-xs text-muted-foreground">{comment.time}</p>
                                    </div>
                                    <p className="text-sm">{comment.content}</p>
                                  </div>
                                  <div className="flex items-center mt-1 text-xs text-muted-foreground">
                                    <button className="hover:text-health-primary mr-4">Like ({comment.likes})</button>
                                    <button className="hover:text-health-primary">Reply</button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                          
                          <div className="flex items-center space-x-3 pt-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>AJ</AvatarFallback>
                            </Avatar>
                            <div className="relative flex-1">
                              <Input 
                                placeholder="Add a comment..." 
                                className="pr-10"
                                onKeyPress={(e) => {
                                  if (e.key === 'Enter') {
                                    handleAddComment(post.id, e.target.value);
                                    e.target.value = '';
                                  }
                                }}
                              />
                              <button 
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-health-primary"
                                onClick={(e) => {
                                  const input = e.target.closest('.relative').querySelector('input');
                                  handleAddComment(post.id, input.value);
                                  input.value = '';
                                }}
                              >
                                <Send className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </Card>
                  ))}
                </div>
              )}
            </div>

            {/* Right Sidebar */}
            <div className="hidden lg:block lg:col-span-3 space-y-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-medium">Your Profile</CardTitle>
                </CardHeader>
                <CardContent className="px-6">
                  <div className="flex flex-col items-center text-center">
                    <Avatar className="h-20 w-20 mb-4">
                      <AvatarFallback className="text-xl">AJ</AvatarFallback>
                    </Avatar>
                    <h3 className="text-lg font-medium">Alex Johnson</h3>
                    <p className="text-sm text-muted-foreground mb-4">Member since September 2023</p>
                    <div className="grid grid-cols-3 w-full mb-4 text-center">
                      <div>
                        <p className="font-medium">24</p>
                        <p className="text-xs text-muted-foreground">Posts</p>
                      </div>
                      <div>
                        <p className="font-medium">156</p>
                        <p className="text-xs text-muted-foreground">Comments</p>
                      </div>
                      <div>
                        <p className="font-medium">14</p>
                        <p className="text-xs text-muted-foreground">Days</p>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full" asChild>
                      <a href="/profile">
                        <User className="mr-2 h-4 w-4" /> View Profile
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
