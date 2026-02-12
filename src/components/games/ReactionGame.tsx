import React, { useState, useRef, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Zap } from 'lucide-react';

type GameState = 'waiting' | 'ready' | 'go' | 'result' | 'too-early';

const ReactionGame = () => {
  const [state, setState] = useState<GameState>('waiting');
  const [reactionTime, setReactionTime] = useState(0);
  const [bestTime, setBestTime] = useState<number | null>(null);
  const [scores, setScores] = useState<number[]>([]);
  const startRef = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const startGame = useCallback(() => {
    setState('ready');
    const delay = 1500 + Math.random() * 4000;
    timeoutRef.current = setTimeout(() => {
      setState('go');
      startRef.current = Date.now();
    }, delay);
  }, []);

  const handleClick = useCallback(() => {
    if (state === 'ready') {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setState('too-early');
    } else if (state === 'go') {
      const time = Date.now() - startRef.current;
      setReactionTime(time);
      setScores(prev => [...prev.slice(-9), time]);
      if (!bestTime || time < bestTime) setBestTime(time);
      setState('result');
    }
  }, [state, bestTime]);

  const getColor = () => {
    switch (state) {
      case 'ready': return 'bg-red-500';
      case 'go': return 'bg-green-500';
      case 'too-early': return 'bg-yellow-500';
      default: return 'bg-primary';
    }
  };

  const getMessage = () => {
    switch (state) {
      case 'waiting': return 'Click Start to begin';
      case 'ready': return 'Wait for GREEN...';
      case 'go': return 'CLICK NOW! ⚡';
      case 'too-early': return 'Too early! Try again';
      case 'result':
        if (reactionTime < 200) return '🔥 Lightning fast!';
        if (reactionTime < 300) return '⚡ Great reflexes!';
        if (reactionTime < 400) return '👍 Good job!';
        return '💪 Keep practicing!';
    }
  };

  const avg = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Zap className="h-5 w-5" /> Reaction Speed Test</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div
          className={`${getColor()} rounded-2xl p-12 text-center cursor-pointer transition-colors duration-200 select-none`}
          onClick={handleClick}
        >
          <div className="text-white text-2xl font-bold">{getMessage()}</div>
          {state === 'result' && (
            <div className="text-white text-5xl font-mono font-bold mt-4">{reactionTime}ms</div>
          )}
        </div>

        <div className="flex justify-center gap-3">
          {(state === 'waiting' || state === 'result' || state === 'too-early') && (
            <Button onClick={startGame} size="lg">{state === 'waiting' ? 'Start' : 'Try Again'}</Button>
          )}
        </div>

        {scores.length > 0 && (
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-muted rounded-lg">
              <div className="text-sm text-muted-foreground">Best</div>
              <div className="text-xl font-bold text-green-500">{bestTime}ms</div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="text-sm text-muted-foreground">Average</div>
              <div className="text-xl font-bold text-primary">{avg}ms</div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="text-sm text-muted-foreground">Attempts</div>
              <div className="text-xl font-bold">{scores.length}</div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ReactionGame;
