import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { StarIcon } from 'lucide-react';
import { GymReview } from '@/types/gym';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface GymReviewsProps {
  gymId: string;
  reviews: (GymReview & { user_profiles: { full_name: string } })[];
  onNewReview?: (review: GymReview) => void;
}

const GymReviews: React.FC<GymReviewsProps> = ({ gymId, reviews, onNewReview }) => {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [hoveredStar, setHoveredStar] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to submit a review",
        variant: "destructive",
      });
      return;
    }
    
    if (rating === 0) {
      toast({
        title: "Rating Required",
        description: "Please select a rating",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Use explicit type assertion to handle database schema mismatch
      const { data, error } = await (supabase as any)
        .from('gym_reviews')
        .insert([{
          gym_id: gymId,
          user_id: user.id || '', // Use empty string as fallback
          rating,
          comment: comment.trim() || null
        }])
        .select();
      
      if (error) throw error;
      
      toast({
        title: "Review Submitted",
        description: "Thank you for your feedback!",
      });
      
      setRating(0);
      setComment('');
      
      if (data && data[0] && onNewReview) {
        onNewReview(data[0] as unknown as GymReview);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to submit review",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="space-y-6">
      {user && (
        <form onSubmit={handleSubmitReview} className="space-y-4 p-4 border rounded-lg">
          <h3 className="text-lg font-medium">Write a review</h3>
          
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <StarIcon
                key={star}
                className={`w-6 h-6 cursor-pointer ${
                  star <= (hoveredStar || rating)
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-gray-300'
                }`}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredStar(star)}
                onMouseLeave={() => setHoveredStar(0)}
              />
            ))}
            <span className="ml-2 text-sm text-gray-500">
              {rating > 0 ? `${rating} out of 5 stars` : 'Select a rating'}
            </span>
          </div>
          
          <Textarea
            placeholder="Share your experience with this gym (optional)"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="resize-none"
            rows={4}
          />
          
          <Button type="submit" disabled={isSubmitting || rating === 0}>
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </Button>
        </form>
      )}
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Reviews ({reviews.length})</h3>
        
        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet. Be the first to review!</p>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="p-4 border rounded-lg">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarFallback>
                    {review.user_profiles.full_name ? 
                      getInitials(review.user_profiles.full_name) : 'U'}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">
                    {review.user_profiles.full_name || 'Anonymous'}
                  </div>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <StarIcon
                        key={star}
                        className={`w-4 h-4 ${
                          star <= review.rating
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-xs text-gray-500">
                      {new Date(review.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
              {review.comment && (
                <p className="mt-3 text-gray-700">{review.comment}</p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default GymReviews;
