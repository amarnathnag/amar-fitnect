import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Timer, Brain, Zap, Target, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import WorkoutTimer from './WorkoutTimerGame';
import CountdownChallenge from './CountdownChallenge';
import ReactionGame from './ReactionGame';
import MemoryGame from './MemoryGame';

const GAMES = [
  {
    id: 'timer',
    icon: '⏱️',
    title: 'Interval Timer',
    description: 'Tabata, HIIT & custom interval presets with audio cues',
    color: 'from-red-500/20 to-orange-500/20 border-red-500/30',
    component: WorkoutTimer,
  },
  {
    id: 'countdown',
    icon: '🎯',
    title: 'Countdown Challenge',
    description: 'Complete rep challenges as fast as possible',
    color: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30',
    component: CountdownChallenge,
  },
  {
    id: 'reaction',
    icon: '⚡',
    title: 'Reaction Speed',
    description: 'Test your reflexes — how fast can you react?',
    color: 'from-green-500/20 to-emerald-500/20 border-green-500/30',
    component: ReactionGame,
  },
  {
    id: 'memory',
    icon: '🧠',
    title: 'Memory Match',
    description: 'Match fitness emoji pairs to train your brain',
    color: 'from-purple-500/20 to-pink-500/20 border-purple-500/30',
    component: MemoryGame,
  },
];

const FitnessGames = () => {
  const [activeGame, setActiveGame] = useState<string | null>(null);

  const ActiveComponent = GAMES.find(g => g.id === activeGame)?.component;

  if (activeGame && ActiveComponent) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" onClick={() => setActiveGame(null)} className="gap-2 -ml-2">
          <ArrowLeft className="h-4 w-4" /> Back to Games
        </Button>
        <ActiveComponent />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          🎮 Fitness Games & Challenges
        </h2>
        <p className="text-muted-foreground mt-2 max-w-md mx-auto">
          Train your body and mind with fun interactive games. Pick a game below to get started!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {GAMES.map(game => (
          <button
            key={game.id}
            onClick={() => setActiveGame(game.id)}
            className={`group text-left p-6 rounded-2xl bg-gradient-to-br ${game.color} border-2 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer`}
          >
            <div className="text-4xl mb-3">{game.icon}</div>
            <h3 className="text-lg font-bold mb-1 group-hover:text-primary transition-colors">{game.title}</h3>
            <p className="text-sm text-muted-foreground">{game.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FitnessGames;
