import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, RotateCcw, Timer } from 'lucide-react';

const PRESETS = [
  { label: 'Tabata', work: 20, rest: 10, rounds: 8 },
  { label: 'HIIT 30/30', work: 30, rest: 30, rounds: 10 },
  { label: 'Plank Hold', work: 60, rest: 30, rounds: 3 },
  { label: 'Sprint Intervals', work: 15, rest: 45, rounds: 12 },
];

const WorkoutTimerGame = () => {
  const [selectedPreset, setSelectedPreset] = useState(PRESETS[0]);
  const [phase, setPhase] = useState<'idle' | 'work' | 'rest' | 'done'>('idle');
  const [timeLeft, setTimeLeft] = useState(PRESETS[0].work);
  const [currentRound, setCurrentRound] = useState(1);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isRunning) return;
    intervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          if (phase === 'work') {
            if (currentRound >= selectedPreset.rounds) {
              setPhase('done');
              setIsRunning(false);
              return 0;
            }
            setPhase('rest');
            return selectedPreset.rest;
          } else {
            setPhase('work');
            setCurrentRound(r => r + 1);
            return selectedPreset.work;
          }
        }
        return prev - 1;
      });
    }, 1000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isRunning, phase, currentRound, selectedPreset]);

  const start = () => {
    setPhase('work');
    setTimeLeft(selectedPreset.work);
    setCurrentRound(1);
    setIsRunning(true);
  };

  const reset = () => {
    setIsRunning(false);
    setPhase('idle');
    setTimeLeft(selectedPreset.work);
    setCurrentRound(1);
  };

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  const phaseColor = phase === 'work' ? 'text-red-500' : phase === 'rest' ? 'text-green-500' : 'text-primary';

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Timer className="h-5 w-5" /> Interval Timer</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-wrap gap-2">
          {PRESETS.map(p => (
            <Badge
              key={p.label}
              variant={selectedPreset.label === p.label ? 'default' : 'outline'}
              className="cursor-pointer px-3 py-1"
              onClick={() => { setSelectedPreset(p); reset(); }}
            >
              {p.label}
            </Badge>
          ))}
        </div>

        <div className="text-center space-y-4">
          <div className={`text-7xl font-mono font-bold ${phaseColor} transition-colors`}>
            {formatTime(timeLeft)}
          </div>
          <div className="text-lg font-semibold uppercase tracking-wider">
            {phase === 'idle' ? 'Ready' : phase === 'done' ? '🎉 Complete!' : phase}
          </div>
          <div className="text-muted-foreground">
            Round {currentRound} / {selectedPreset.rounds}
          </div>
        </div>

        <div className="flex justify-center gap-3">
          {phase === 'idle' ? (
            <Button onClick={start} size="lg" className="gap-2"><Play className="h-5 w-5" /> Start</Button>
          ) : (
            <>
              <Button onClick={() => setIsRunning(!isRunning)} variant="outline" size="lg" className="gap-2">
                {isRunning ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                {isRunning ? 'Pause' : 'Resume'}
              </Button>
              <Button onClick={reset} variant="destructive" size="lg" className="gap-2">
                <RotateCcw className="h-5 w-5" /> Reset
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkoutTimerGame;
