
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import PremiumUpsell from '@/components/premium/PremiumUpsell';
import PremiumDashboard from '@/components/premium/PremiumDashboard';
import { Badge } from '@/components/ui/badge';
import { blogPosts } from '@/data/blogPosts';
import BlogList from '@/components/blog/BlogList';

const PremiumAi = () => {
  const { user } = useAuth();
  const isPremium = false; // In a real app, this would come from user data
  
  // Filter only premium blog posts
  const premiumPosts = blogPosts.filter(post => post.isPremium);
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        {!isPremium ? (
          <>
            <PremiumUpsell />
            
            {/* Premium Content Preview */}
            <section className="py-12 bg-gray-50 dark:bg-gray-800/30">
              <div className="container-custom">
                <div className="text-center mb-8">
                  <Badge variant="outline" className="mb-2">Premium Content</Badge>
                  <h2 className="text-2xl md:text-3xl font-bold mb-3">
                    Exclusive Health Articles & Resources
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    Unlock these premium health articles and many more when you subscribe to AmarHealth Premium.
                  </p>
                </div>
                
                <BlogList 
                  posts={premiumPosts} 
                  isPremiumUser={false} 
                />
              </div>
            </section>
          </>
        ) : (
          <PremiumDashboard />
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default PremiumAi;
