import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Target, Trophy } from 'lucide-react';

const CHALLENGES = [
  { name: '50 Jumping Jacks', target: 50, icon: '🏃' },
  { name: '30 Push-ups', target: 30, icon: '💪' },
  { name: '40 Squats', target: 40, icon: '🦵' },
  { name: '20 Burpees', target: 20, icon: '🔥' },
  { name: '60s Plank Hold', target: 60, icon: '🧘' },
];

const CountdownChallenge = () => {
  const [selectedChallenge, setSelectedChallenge] = useState(CHALLENGES[0]);
  const [count, setCount] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [bestTimes, setBestTimes] = useState<Record<string, number>>({});
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
  };

  const incrementCount = () => {
    const newCount = count + 1;
    setCount(newCount);
    if (newCount >= selectedChallenge.target) {
      setIsActive(false);
      const key = selectedChallenge.name;
      if (!bestTimes[key] || elapsedTime < bestTimes[key]) {
        setBestTimes(prev => ({ ...prev, [key]: elapsedTime }));
      }
    }
  };

  const progress = (count / selectedChallenge.target) * 100;
  const isComplete = count >= selectedChallenge.target;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Target className="h-5 w-5" /> Countdown Challenge</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-wrap gap-2">
          {CHALLENGES.map(c => (
            <Badge
              key={c.name}
              variant={selectedChallenge.name === c.name ? 'default' : 'outline'}
              className="cursor-pointer px-3 py-1"
              onClick={() => { setSelectedChallenge(c); setCount(0); setIsActive(false); setElapsedTime(0); }}
            >
              {c.icon} {c.name}
            </Badge>
          ))}
        </div>

        <div className="text-center space-y-4">
          <div className="text-6xl font-bold">{selectedChallenge.icon}</div>
          <div className="text-5xl font-mono font-bold text-primary">
            {count} / {selectedChallenge.target}
          </div>
          <div className="w-full bg-muted rounded-full h-4 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300 rounded-full"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <div className="text-muted-foreground">⏱️ {elapsedTime}s elapsed</div>
          {bestTimes[selectedChallenge.name] && (
            <div className="flex items-center justify-center gap-1 text-yellow-500">
              <Trophy className="h-4 w-4" /> Best: {bestTimes[selectedChallenge.name]}s
            </div>
          )}
        </div>

        <div className="flex justify-center gap-3">
          {!isActive && !isComplete && (
            <Button onClick={startChallenge} size="lg">Start Challenge</Button>
          )}
          {isActive && (
            <Button onClick={incrementCount} size="lg" className="h-20 w-40 text-xl">
              TAP! ({selectedChallenge.target - count} left)
            </Button>
          )}
          {isComplete && (
            <div className="text-center space-y-3">
              <div className="text-2xl font-bold text-green-500">🎉 Challenge Complete!</div>
              <Button onClick={startChallenge} variant="outline">Try Again</Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CountdownChallenge;
