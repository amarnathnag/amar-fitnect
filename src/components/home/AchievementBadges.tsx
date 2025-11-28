import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Badge } from '@/components/ui/badge';
import { Award, Flame, Star, Trophy, Crown, Zap } from 'lucide-react';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  requiredStreak: number;
  gradient: string;
  unlocked: boolean;
}

interface AchievementBadgesProps {
  currentStreak: number;
}

const AchievementBadges: React.FC<AchievementBadgesProps> = ({ currentStreak }) => {
  const { user } = useAuth();
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebratedAchievement, setCelebratedAchievement] = useState<Achievement | null>(null);

  const achievements: Achievement[] = [
    {
      id: 'streak_7',
      name: 'Week Warrior',
      description: '7 day workout streak!',
      icon: <Flame className="h-5 w-5" />,
      requiredStreak: 7,
      gradient: 'from-orange-400 to-red-500',
      unlocked: currentStreak >= 7,
    },
    {
      id: 'streak_30',
      name: 'Monthly Master',
      description: '30 day workout streak!',
      icon: <Trophy className="h-5 w-5" />,
      requiredStreak: 30,
      gradient: 'from-yellow-400 to-amber-500',
      unlocked: currentStreak >= 30,
    },
    {
      id: 'streak_100',
      name: 'Century Champion',
      description: '100 day workout streak!',
      icon: <Crown className="h-5 w-5" />,
      requiredStreak: 100,
      gradient: 'from-purple-400 to-pink-500',
      unlocked: currentStreak >= 100,
    },
  ];

  useEffect(() => {
    if (!user?.id) return;

    const celebratedKey = `celebrated_achievements_${user.id}`;
    const celebrated = JSON.parse(localStorage.getItem(celebratedKey) || '[]');

    // Check for new achievements to celebrate
    for (const achievement of achievements) {
      if (achievement.unlocked && !celebrated.includes(achievement.id)) {
        // New achievement unlocked!
        setCelebratedAchievement(achievement);
        setShowCelebration(true);
        
        // Mark as celebrated
        celebrated.push(achievement.id);
        localStorage.setItem(celebratedKey, JSON.stringify(celebrated));
        break;
      }
    }
  }, [currentStreak, user?.id]);

  const closeCelebration = () => {
    setShowCelebration(false);
    setCelebratedAchievement(null);
  };

  return (
    <>
      {/* Achievement Badges Display */}
      <div className="flex items-center gap-2 flex-wrap">
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            className={`relative group ${!achievement.unlocked ? 'opacity-40 grayscale' : ''}`}
          >
            <div
              className={`p-2 rounded-full bg-gradient-to-br ${achievement.gradient} text-white shadow-md transition-transform ${
                achievement.unlocked ? 'hover:scale-110 cursor-pointer' : ''
              }`}
              title={achievement.unlocked ? `${achievement.name}: ${achievement.description}` : `Unlock at ${achievement.requiredStreak} days`}
            >
              {achievement.icon}
            </div>
            
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-popover text-popover-foreground text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 border border-border">
              <div className="font-semibold">{achievement.name}</div>
              <div className="text-muted-foreground">
                {achievement.unlocked ? achievement.description : `${achievement.requiredStreak} day streak required`}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Celebration Modal */}
      <Dialog open={showCelebration} onOpenChange={setShowCelebration}>
        <DialogContent className="sm:max-w-md p-0 overflow-hidden border-0">
          {celebratedAchievement && (
            <div className="relative">
              {/* Confetti Background */}
              <div className="absolute inset-0 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute animate-bounce"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 2}s`,
                      animationDuration: `${1 + Math.random()}s`,
                    }}
                  >
                    <Star
                      className={`h-4 w-4 ${
                        ['text-yellow-400', 'text-orange-400', 'text-pink-400', 'text-purple-400'][
                          Math.floor(Math.random() * 4)
                        ]
                      }`}
                      fill="currentColor"
                    />
                  </div>
                ))}
              </div>

              {/* Content */}
              <div className="relative p-8 text-center">
                <div className="mb-4">
                  <Zap className="h-8 w-8 text-yellow-500 mx-auto animate-pulse" />
                </div>
                
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Achievement Unlocked!
                </h2>
                
                {/* Badge */}
                <div className="my-6 flex justify-center">
                  <div
                    className={`p-6 rounded-full bg-gradient-to-br ${celebratedAchievement.gradient} text-white shadow-xl animate-scale-in`}
                  >
                    <div className="h-12 w-12 flex items-center justify-center">
                      {React.cloneElement(celebratedAchievement.icon as React.ReactElement, {
                        className: 'h-12 w-12',
                      })}
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-foreground mb-1">
                  {celebratedAchievement.name}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {celebratedAchievement.description}
                </p>

                <div className="flex items-center justify-center gap-2 mb-6">
                  <Badge variant="secondary" className="text-sm py-1 px-3">
                    <Flame className="h-4 w-4 mr-1 text-orange-500" />
                    {currentStreak} Day Streak
                  </Badge>
                </div>

                <Button onClick={closeCelebration} className="w-full">
                  Keep Going!
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AchievementBadges;
