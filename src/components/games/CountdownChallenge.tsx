import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Target, Trophy, RotateCcw } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const CHALLENGES = [
  { name: '50 Jumping Jacks', target: 50, icon: '🏃', color: 'from-blue-500 to-cyan-500' },
  { name: '30 Push-ups', target: 30, icon: '💪', color: 'from-red-500 to-orange-500' },
  { name: '40 Squats', target: 40, icon: '🦵', color: 'from-purple-500 to-pink-500' },
  { name: '20 Burpees', target: 20, icon: '🔥', color: 'from-orange-500 to-yellow-500' },
  { name: '25 Lunges', target: 25, icon: '🏋️', color: 'from-green-500 to-emerald-500' },
];

const CountdownChallenge = () => {
  const [selectedChallenge, setSelectedChallenge] = useState(CHALLENGES[0]);
  const [count, setCount] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [bestTimes, setBestTimes] = useState<Record<string, number>>({});
  const [showComplete, setShowComplete] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isActive) return;
    timerRef.current = setInterval(() => setElapsedTime(t => t + 1), 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isActive]);

  const startChallenge = () => {
    setCount(0);
    setElapsedTime(0);
    setIsActive(true);
    setShowComplete(false);
  };

  const incrementCount = () => {
    if (!isActive) return;
    const newCount = count + 1;
    setCount(newCount);
    if (newCount >= selectedChallenge.target) {
      setIsActive(false);
      setShowComplete(true);
      const key = selectedChallenge.name;
      if (!bestTimes[key] || elapsedTime < bestTimes[key]) {
        setBestTimes(prev => ({ ...prev, [key]: elapsedTime }));
      }
    }
  };

  const progress = (count / selectedChallenge.target) * 100;
  const remaining = selectedChallenge.target - count;
  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2"><Target className="h-5 w-5 text-primary" /> Countdown Challenge</CardTitle>
        <CardDescription>Tap to count each rep — complete the challenge as fast as you can!</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Challenge Selection */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {CHALLENGES.map(c => (
            <button
              key={c.name}
              onClick={() => { if (!isActive) { setSelectedChallenge(c); setCount(0); setElapsedTime(0); setShowComplete(false); } }}
              className={`p-3 rounded-xl border-2 text-left transition-all ${
                selectedChallenge.name === c.name
                  ? 'border-primary bg-primary/10 shadow-md'
                  : 'border-border hover:border-primary/50'
              } ${isActive ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <span className="text-2xl">{c.icon}</span>
              <div className="text-xs font-semibold mt-1">{c.name}</div>
            </button>
          ))}
        </div>

        {/* Counter Display */}
        <div className={`bg-gradient-to-br ${selectedChallenge.color} rounded-2xl p-6 text-center text-white shadow-lg`}>
          <div className="text-6xl mb-2">{selectedChallenge.icon}</div>
          <div className="text-5xl font-black tabular-nums">
            {count} <span className="text-2xl opacity-70">/ {selectedChallenge.target}</span>
          </div>
          <div className="mt-3 bg-white/20 rounded-full h-3 overflow-hidden">
            <div className="h-full bg-white/60 rounded-full transition-all duration-200" style={{ width: `${Math.min(progress, 100)}%` }} />
          </div>
          <div className="mt-2 text-sm opacity-80 tabular-nums">⏱️ {formatTime(elapsedTime)}</div>
        </div>

        {/* Best Time */}
        {bestTimes[selectedChallenge.name] && (
          <div className="flex items-center justify-center gap-2 py-2 px-4 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
            <Trophy className="h-4 w-4 text-yellow-500" />
            <span className="text-sm font-medium">Best Time: {formatTime(bestTimes[selectedChallenge.name])}</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col items-center gap-3">
          {!isActive && !showComplete && (
            <Button onClick={startChallenge} size="lg" className="w-full h-14 text-lg rounded-xl shadow-lg gap-2">
              <Target className="h-5 w-5" /> Start Challenge
            </Button>
          )}
          {isActive && (
            <button
              onClick={incrementCount}
              className="w-full h-28 bg-gradient-to-br from-primary to-secondary text-primary-foreground rounded-2xl text-2xl font-bold shadow-xl active:scale-95 transition-transform duration-100 select-none touch-manipulation"
            >
              TAP! 👆
              <div className="text-sm font-normal opacity-80 mt-1">{remaining} remaining</div>
            </button>
          )}
          {showComplete && (
            <div className="text-center space-y-3 w-full">
              <div className="text-3xl font-bold text-green-500">🎉 Challenge Complete!</div>
              <div className="text-muted-foreground">Finished in {formatTime(elapsedTime)}</div>
              <Button onClick={startChallenge} variant="outline" size="lg" className="gap-2 rounded-xl">
                <RotateCcw className="h-4 w-4" /> Try Again
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CountdownChallenge;
