
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import PremiumUpsell from '@/components/premium/PremiumUpsell';
import EnhancedPremiumDashboard from '@/components/premium/EnhancedPremiumDashboard';
import { Badge } from '@/components/ui/badge';
import { blogPosts } from '@/data/blogPosts';
import BlogList from '@/components/blog/BlogList';
import { Button } from '@/components/ui/button';
import { Crown } from 'lucide-react';

const PremiumAi = () => {
  const { user, upgradeToPremium } = useAuth();
  
  // For demo purposes, allow access if user is authenticated
  // In production, check actual premium status from database
  const isPremium = user?.isPremium || user?.isAuthenticated;
  
  // Filter only premium blog posts
  const premiumPosts = blogPosts.filter(post => post.isPremium);

  const handleUpgradeToPremium = () => {
    const success = upgradeToPremium();
    if (success) {
      window.location.reload(); // Refresh to show premium content
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        {!isPremium ? (
          <>
            <PremiumUpsell />
            
             {/* Temporary Premium Access Button for Demo */}
             {user && (
               <section className="py-8 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20">
                 <div className="container-custom text-center space-y-4">
                   <div className="flex gap-4 justify-center">
                     <Button 
                       onClick={handleUpgradeToPremium}
                       className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white px-8 py-3 text-lg"
                     >
                       <Crown className="mr-2 h-5 w-5" />
                       Get Instant Premium Access (Demo)
                     </Button>
                     <Button 
                       onClick={() => window.location.href = '/premium-unlocked'}
                       variant="outline"
                       className="px-8 py-3 text-lg border-amber-500 text-amber-600 hover:bg-amber-50"
                     >
                       Premium Dashboard
                     </Button>
                   </div>
                   <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                     Click to unlock premium features for this session
                   </p>
                 </div>
               </section>
             )}
            
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
          <EnhancedPremiumDashboard />
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default PremiumAi;
