import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Timer, Brain, Zap, Target } from 'lucide-react';
import WorkoutTimer from './WorkoutTimerGame';
import CountdownChallenge from './CountdownChallenge';
import ReactionGame from './ReactionGame';
import MemoryGame from './MemoryGame';

const FitnessGames = () => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          🎮 Fitness Games & Challenges
        </h2>
        <p className="text-muted-foreground mt-1">Train your body and mind with fun interactive games</p>
      </div>

      <Tabs defaultValue="timer" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="timer" className="flex items-center gap-1">
            <Timer className="h-4 w-4" />
            <span className="hidden sm:inline">Timer</span>
          </TabsTrigger>
          <TabsTrigger value="countdown" className="flex items-center gap-1">
            <Target className="h-4 w-4" />
            <span className="hidden sm:inline">Countdown</span>
          </TabsTrigger>
          <TabsTrigger value="reaction" className="flex items-center gap-1">
            <Zap className="h-4 w-4" />
            <span className="hidden sm:inline">Reaction</span>
          </TabsTrigger>
          <TabsTrigger value="memory" className="flex items-center gap-1">
            <Brain className="h-4 w-4" />
            <span className="hidden sm:inline">Memory</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="timer"><WorkoutTimer /></TabsContent>
        <TabsContent value="countdown"><CountdownChallenge /></TabsContent>
        <TabsContent value="reaction"><ReactionGame /></TabsContent>
        <TabsContent value="memory"><MemoryGame /></TabsContent>
      </Tabs>
    </div>
  );
};

export default FitnessGames;
