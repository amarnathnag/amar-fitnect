import React, { useState } from 'react';
import { Trophy, Medal, Crown, Flame, Zap, Target, User, Eye, EyeOff, Edit2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useLeaderboard, LeaderboardEntry } from '@/hooks/useLeaderboard';
import { useAuth } from '@/contexts/AuthContext';

type LeaderboardType = 'total_xp' | 'weekly_xp' | 'monthly_xp' | 'total_workouts' | 'current_streak';

const Leaderboard = () => {
  const { user } = useAuth();
  const { 
    leaderboard, 
    userEntry, 
    loading, 
    fetchLeaderboard, 
    updateDisplayName, 
    toggleLeaderboardVisibility 
  } = useLeaderboard();

  const [activeTab, setActiveTab] = useState<LeaderboardType>('total_xp');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [newDisplayName, setNewDisplayName] = useState(userEntry?.display_name || '');

  const handleTabChange = (value: string) => {
    setActiveTab(value as LeaderboardType);
    fetchLeaderboard(value as LeaderboardType);
  };

  const handleUpdateDisplayName = async () => {
    if (newDisplayName.trim()) {
      await updateDisplayName(newDisplayName.trim());
      setIsSettingsOpen(false);
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Medal className="h-6 w-6 text-amber-600" />;
      default:
        return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const getValueForType = (entry: LeaderboardEntry, type: LeaderboardType) => {
    switch (type) {
      case 'total_xp':
        return `${entry.total_xp?.toLocaleString() || 0} XP`;
      case 'weekly_xp':
        return `${entry.weekly_xp?.toLocaleString() || 0} XP`;
      case 'monthly_xp':
        return `${entry.monthly_xp?.toLocaleString() || 0} XP`;
      case 'total_workouts':
        return `${entry.total_workouts || 0} workouts`;
      case 'current_streak':
        return `${entry.current_streak || 0} days`;
      default:
        return '0';
    }
  };

  const getTabIcon = (type: LeaderboardType) => {
    switch (type) {
      case 'total_xp':
        return <Zap className="h-4 w-4" />;
      case 'weekly_xp':
        return <Target className="h-4 w-4" />;
      case 'monthly_xp':
        return <Trophy className="h-4 w-4" />;
      case 'total_workouts':
        return <Medal className="h-4 w-4" />;
      case 'current_streak':
        return <Flame className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const renderLeaderboardEntry = (entry: LeaderboardEntry, index: number) => {
    const isCurrentUser = user && entry.user_id === user.id;
    const rank = entry.rank || index + 1;

    return (
      <div
        key={entry.id}
        className={`
          flex items-center justify-between p-4 rounded-lg transition-all
          ${rank <= 3 ? 'bg-gradient-to-r from-primary/10 to-transparent' : 'bg-muted/50'}
          ${isCurrentUser ? 'ring-2 ring-primary' : ''}
        `}
      >
        <div className="flex items-center gap-4">
          <div className="w-10 flex justify-center">
            {getRankIcon(rank)}
          </div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-semibold flex items-center gap-2">
                {entry.display_name || 'Anonymous'}
                {isCurrentUser && (
                  <Badge variant="secondary" className="text-xs">You</Badge>
                )}
              </p>
              <p className="text-sm text-muted-foreground">
                {entry.total_workouts || 0} workouts • {entry.longest_streak || 0} day best streak
              </p>
            </div>
          </div>
        </div>
        <div className="text-right">
          <p className="font-bold text-lg">{getValueForType(entry, activeTab)}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* User Stats Card */}
      {user && (
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Your Stats</CardTitle>
              <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Edit2 className="h-4 w-4 mr-1" />
                    Settings
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Leaderboard Settings</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Display Name</Label>
                      <Input
                        value={newDisplayName}
                        onChange={(e) => setNewDisplayName(e.target.value)}
                        placeholder="Enter your display name"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Show on Leaderboard</Label>
                        <p className="text-sm text-muted-foreground">
                          Others can see your stats
                        </p>
                      </div>
                      <Switch
                        checked={userEntry?.show_on_leaderboard ?? true}
                        onCheckedChange={toggleLeaderboardVisibility}
                      />
                    </div>
                    <Button onClick={handleUpdateDisplayName} className="w-full">
                      Save Changes
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            {userEntry ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-background rounded-lg">
                  <Zap className="h-5 w-5 mx-auto mb-1 text-yellow-500" />
                  <p className="text-2xl font-bold">{userEntry.total_xp?.toLocaleString() || 0}</p>
                  <p className="text-xs text-muted-foreground">Total XP</p>
                </div>
                <div className="text-center p-3 bg-background rounded-lg">
                  <Trophy className="h-5 w-5 mx-auto mb-1 text-primary" />
                  <p className="text-2xl font-bold">{userEntry.total_workouts || 0}</p>
                  <p className="text-xs text-muted-foreground">Workouts</p>
                </div>
                <div className="text-center p-3 bg-background rounded-lg">
                  <Flame className="h-5 w-5 mx-auto mb-1 text-orange-500" />
                  <p className="text-2xl font-bold">{userEntry.current_streak || 0}</p>
                  <p className="text-xs text-muted-foreground">Current Streak</p>
                </div>
                <div className="text-center p-3 bg-background rounded-lg">
                  <Medal className="h-5 w-5 mx-auto mb-1 text-amber-600" />
                  <p className="text-2xl font-bold">{userEntry.longest_streak || 0}</p>
                  <p className="text-xs text-muted-foreground">Best Streak</p>
                </div>
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-4">
                Complete your first workout to appear on the leaderboard!
              </p>
            )}
          </CardContent>
        </Card>
      )}

      {/* Leaderboard */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            Global Leaderboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={handleTabChange}>
            <TabsList className="grid grid-cols-5 mb-4">
              <TabsTrigger value="total_xp" className="flex items-center gap-1">
                {getTabIcon('total_xp')}
                <span className="hidden sm:inline">Total XP</span>
              </TabsTrigger>
              <TabsTrigger value="weekly_xp" className="flex items-center gap-1">
                {getTabIcon('weekly_xp')}
                <span className="hidden sm:inline">Weekly</span>
              </TabsTrigger>
              <TabsTrigger value="monthly_xp" className="flex items-center gap-1">
                {getTabIcon('monthly_xp')}
                <span className="hidden sm:inline">Monthly</span>
              </TabsTrigger>
              <TabsTrigger value="total_workouts" className="flex items-center gap-1">
                {getTabIcon('total_workouts')}
                <span className="hidden sm:inline">Workouts</span>
              </TabsTrigger>
              <TabsTrigger value="current_streak" className="flex items-center gap-1">
                {getTabIcon('current_streak')}
                <span className="hidden sm:inline">Streak</span>
              </TabsTrigger>
            </TabsList>

            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="h-16 bg-muted animate-pulse rounded-lg" />
                ))}
              </div>
            ) : leaderboard.length === 0 ? (
              <div className="text-center py-8">
                <Trophy className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                <p className="text-muted-foreground">No entries yet. Be the first!</p>
              </div>
            ) : (
              <div className="space-y-2">
                {leaderboard.map((entry, index) => renderLeaderboardEntry(entry, index))}
              </div>
            )}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Leaderboard;
