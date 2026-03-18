import React, { useState, useRef, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Zap, RotateCcw } from 'lucide-react';

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

  const resetAll = () => {
    setState('waiting');
    setReactionTime(0);
    setBestTime(null);
    setScores([]);
  };

  const getRating = (ms: number) => {
    if (ms < 200) return { label: '🔥 Lightning Fast!', color: 'text-yellow-400' };
    if (ms < 250) return { label: '⚡ Incredible!', color: 'text-green-400' };
    if (ms < 350) return { label: '👍 Great Reflexes!', color: 'text-blue-400' };
    if (ms < 500) return { label: '💪 Good Job!', color: 'text-primary' };
    return { label: '🐢 Keep Practicing!', color: 'text-muted-foreground' };
  };

  const avg = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;

  const zoneStyle = {
    waiting: 'bg-gradient-to-br from-primary to-secondary cursor-pointer',
    ready: 'bg-gradient-to-br from-red-600 to-red-500 cursor-pointer animate-pulse',
    go: 'bg-gradient-to-br from-green-500 to-emerald-400 cursor-pointer',
    result: 'bg-gradient-to-br from-primary to-secondary',
    'too-early': 'bg-gradient-to-br from-yellow-500 to-amber-500',
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2"><Zap className="h-5 w-5 text-primary" /> Reaction Speed Test</CardTitle>
            <CardDescription>Wait for green, then tap as fast as you can!</CardDescription>
          </div>
          {scores.length > 0 && (
            <Button variant="ghost" size="icon" onClick={resetAll} className="h-8 w-8">
              <RotateCcw className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Game Zone */}
        <div
          className={`${zoneStyle[state]} rounded-2xl p-10 text-center select-none touch-manipulation shadow-lg transition-all duration-200 active:scale-[0.98]`}
          onClick={state === 'ready' || state === 'go' ? handleClick : undefined}
        >
          <div className="text-white space-y-3">
            {state === 'waiting' && (
              <>
                <div className="text-5xl">⚡</div>
                <div className="text-xl font-bold">Tap "Start" below</div>
                <div className="text-sm opacity-70">Test your reaction speed</div>
              </>
            )}
            {state === 'ready' && (
              <>
                <div className="text-5xl">🔴</div>
                <div className="text-2xl font-bold">Wait for GREEN...</div>
                <div className="text-sm opacity-70">Don't tap yet!</div>
              </>
            )}
            {state === 'go' && (
              <>
                <div className="text-5xl">🟢</div>
                <div className="text-3xl font-black">TAP NOW!</div>
              </>
            )}
            {state === 'too-early' && (
              <>
                <div className="text-5xl">⚠️</div>
                <div className="text-2xl font-bold">Too Early!</div>
                <div className="text-sm opacity-80">Wait for the green light</div>
              </>
            )}
            {state === 'result' && (
              <>
                <div className="text-6xl font-mono font-black tabular-nums">{reactionTime}ms</div>
                <div className={`text-xl font-bold ${getRating(reactionTime).color}`}>
                  {getRating(reactionTime).label}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Action */}
        <div className="flex justify-center">
          {(state === 'waiting' || state === 'result' || state === 'too-early') && (
            <Button onClick={startGame} size="lg" className="h-14 px-10 text-lg rounded-xl shadow-lg gap-2">
              <Zap className="h-5 w-5" />
              {state === 'waiting' ? 'Start' : 'Try Again'}
            </Button>
          )}
        </div>

        {/* Stats */}
        {scores.length > 0 && (
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-xl text-center">
              <div className="text-xs text-muted-foreground font-medium">🏆 Best</div>
              <div className="text-2xl font-black text-green-500 tabular-nums">{bestTime}ms</div>
            </div>
            <div className="bg-primary/10 border border-primary/20 p-4 rounded-xl text-center">
              <div className="text-xs text-muted-foreground font-medium">📊 Average</div>
              <div className="text-2xl font-black text-primary tabular-nums">{avg}ms</div>
            </div>
            <div className="bg-muted p-4 rounded-xl text-center">
              <div className="text-xs text-muted-foreground font-medium">🎯 Attempts</div>
              <div className="text-2xl font-black tabular-nums">{scores.length}</div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ReactionGame;
