import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Share2, Image, Trophy, Flame, Target } from 'lucide-react';
import { toast } from 'sonner';

interface ShareableStats {
  weeklyWorkouts: number;
  totalCalories: number;
  currentStreak: number;
  leaderboardRank?: number;
  achievements?: string[];
  userName?: string;
}

interface ShareableImageGeneratorProps {
  stats: ShareableStats;
  variant?: 'summary' | 'achievement' | 'rank';
}

export const ShareableImageGenerator: React.FC<ShareableImageGeneratorProps> = ({
  stats,
  variant = 'summary'
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateImage = async (): Promise<string | null> => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    // Set canvas size for social media (1200x630 for optimal sharing)
    canvas.width = 1200;
    canvas.height = 630;

    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#1a1a2e');
    gradient.addColorStop(0.5, '#16213e');
    gradient.addColorStop(1, '#0f3460');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add decorative elements
    ctx.fillStyle = 'rgba(99, 102, 241, 0.1)';
    ctx.beginPath();
    ctx.arc(100, 100, 200, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(1100, 530, 250, 0, Math.PI * 2);
    ctx.fill();

    // Add border
    ctx.strokeStyle = 'rgba(99, 102, 241, 0.5)';
    ctx.lineWidth = 4;
    ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

    // Title
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 48px system-ui, -apple-system, sans-serif';
    ctx.textAlign = 'center';
    
    if (variant === 'summary') {
      ctx.fillText('🏋️ Weekly Fitness Summary', canvas.width / 2, 80);
    } else if (variant === 'achievement') {
      ctx.fillText('🏆 Achievement Unlocked!', canvas.width / 2, 80);
    } else {
      ctx.fillText('🎯 Leaderboard Rank', canvas.width / 2, 80);
    }

    // User name
    if (stats.userName) {
      ctx.font = '32px system-ui, -apple-system, sans-serif';
      ctx.fillStyle = '#a5b4fc';
      ctx.fillText(stats.userName, canvas.width / 2, 130);
    }

    // Stats cards
    const cardWidth = 280;
    const cardHeight = 180;
    const startX = 100;
    const startY = 180;
    const gap = 40;

    // Card 1: Workouts
    drawStatCard(ctx, startX, startY, cardWidth, cardHeight, {
      icon: '💪',
      value: stats.weeklyWorkouts.toString(),
      label: 'Workouts This Week',
      color: '#10b981'
    });

    // Card 2: Calories
    drawStatCard(ctx, startX + cardWidth + gap, startY, cardWidth, cardHeight, {
      icon: '🔥',
      value: stats.totalCalories.toLocaleString(),
      label: 'Calories Burned',
      color: '#f59e0b'
    });

    // Card 3: Streak
    drawStatCard(ctx, startX + (cardWidth + gap) * 2, startY, cardWidth, cardHeight, {
      icon: '⚡',
      value: `${stats.currentStreak} days`,
      label: 'Current Streak',
      color: '#8b5cf6'
    });

    // Leaderboard rank if available
    if (stats.leaderboardRank) {
      ctx.fillStyle = '#fbbf24';
      ctx.font = 'bold 36px system-ui, -apple-system, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`🏅 Ranked #${stats.leaderboardRank} on Leaderboard`, canvas.width / 2, 420);
    }

    // Achievements if available
    if (stats.achievements && stats.achievements.length > 0) {
      ctx.fillStyle = '#a5b4fc';
      ctx.font = '24px system-ui, -apple-system, sans-serif';
      ctx.fillText(`🎖️ Achievements: ${stats.achievements.slice(0, 3).join(' • ')}`, canvas.width / 2, 480);
    }

    // Footer
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.font = '20px system-ui, -apple-system, sans-serif';
    ctx.fillText('Join me on my fitness journey! 💪', canvas.width / 2, 560);
    
    ctx.fillStyle = '#6366f1';
    ctx.font = 'bold 24px system-ui, -apple-system, sans-serif';
    ctx.fillText('#FitnessGoals #WorkoutSummary', canvas.width / 2, 595);

    return canvas.toDataURL('image/png');
  };

  const drawStatCard = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    data: { icon: string; value: string; label: string; color: string }
  ) => {
    // Card background
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.beginPath();
    ctx.roundRect(x, y, width, height, 16);
    ctx.fill();

    // Card border
    ctx.strokeStyle = data.color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(x, y, width, height, 16);
    ctx.stroke();

    // Icon
    ctx.font = '48px system-ui';
    ctx.textAlign = 'center';
    ctx.fillText(data.icon, x + width / 2, y + 55);

    // Value
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 36px system-ui, -apple-system, sans-serif';
    ctx.fillText(data.value, x + width / 2, y + 110);

    // Label
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.font = '18px system-ui, -apple-system, sans-serif';
    ctx.fillText(data.label, x + width / 2, y + 145);
  };

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      const imageData = await generateImage();
      if (imageData) {
        const link = document.createElement('a');
        link.download = `fitness-summary-${new Date().toISOString().split('T')[0]}.png`;
        link.href = imageData;
        link.click();
        toast.success('Image downloaded! Share it on your favorite social media.');
      }
    } catch (error) {
      toast.error('Failed to generate image');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleShare = async () => {
    setIsGenerating(true);
    try {
      const imageData = await generateImage();
      if (imageData && navigator.share) {
        const blob = await (await fetch(imageData)).blob();
        const file = new File([blob], 'fitness-summary.png', { type: 'image/png' });
        
        await navigator.share({
          title: 'My Weekly Fitness Summary',
          text: `🏋️ Check out my fitness progress! ${stats.weeklyWorkouts} workouts, ${stats.totalCalories} calories burned, ${stats.currentStreak} day streak! #FitnessGoals`,
          files: [file]
        });
        toast.success('Shared successfully!');
      } else {
        // Fallback to download
        handleDownload();
      }
    } catch (error) {
      if ((error as Error).name !== 'AbortError') {
        toast.error('Failed to share. Try downloading instead.');
      }
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Image className="h-5 w-5 text-primary" />
          Share Your Progress
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Generate a beautiful image of your fitness stats to share on any social media platform!
        </p>
        
        {/* Preview of stats */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-background/50 rounded-lg p-3">
            <Trophy className="h-5 w-5 mx-auto text-yellow-500 mb-1" />
            <div className="font-bold">{stats.weeklyWorkouts}</div>
            <div className="text-xs text-muted-foreground">Workouts</div>
          </div>
          <div className="bg-background/50 rounded-lg p-3">
            <Flame className="h-5 w-5 mx-auto text-orange-500 mb-1" />
            <div className="font-bold">{stats.totalCalories}</div>
            <div className="text-xs text-muted-foreground">Calories</div>
          </div>
          <div className="bg-background/50 rounded-lg p-3">
            <Target className="h-5 w-5 mx-auto text-purple-500 mb-1" />
            <div className="font-bold">{stats.currentStreak}d</div>
            <div className="text-xs text-muted-foreground">Streak</div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button 
            onClick={handleDownload} 
            disabled={isGenerating}
            className="flex-1"
            variant="outline"
          >
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          <Button 
            onClick={handleShare} 
            disabled={isGenerating}
            className="flex-1"
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>

        {/* Hidden canvas for image generation */}
        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </CardContent>
    </Card>
  );
};
